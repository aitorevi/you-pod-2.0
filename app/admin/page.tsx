"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";

interface Podcast {
  id: string;
  title: string;
  description: string;
  url: string;
}

const AdminPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const podcastData = {
      title,
      description,
      url,
    };
    handleOpen();

    try {
      const response = await fetch("/api/podcasts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(podcastData),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        const data = await response.json();
        setErrorMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again."); // Set a generic error message
    }
  };

  const fetchPodcasts = async () => {
    const response = await fetch("/api/podcasts");
    const data = await response.json();
    console.log(data);
    return data;
  };

  return (
    <>
      <div className="container mx-auto max-w-screen-xl h-screen my-3 rounded-lg shadow-md px-4 py-2">
        <div>
          <h1 className="text-4xl font-bold text-center text-blue-gray-900">
            Administration panel
          </h1>

          <Button onClick={fetchPodcasts} className="bg-[#55b048]">
            Get podcasts
          </Button>

          <Button onClick={handleOpen} className="bg-[#55b048]">
            New podcast
          </Button>
          <Dialog
            size="lg"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardHeader
                variant="gradient"
                color="blue"
                className="mb-4 grid h-28 place-items-center"
              >
                <Typography variant="h3" color="white">
                  Create a podcast
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <Input
                  id="title"
                  type="text"
                  label="Title"
                  size="lg"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  id="description"
                  label="Description"
                  size="lg"
                  onChange={(e) => setDescription(e.target.value)}
                />
                <Input
                  id="url"
                  type={url}
                  label="Url"
                  size="lg"
                  onChange={(e) => setUrl(e.target.value)}
                />
              </CardBody>
              <CardFooter className="pt-0 justify-center ">
                <Button variant="gradient" onClick={handleSubmit} fullWidth>
                  Create postcast
                </Button>
              </CardFooter>
            </Card>
          </Dialog>
          {errorMessage && (
            <Typography
              id="error-message"
              color="red"
              className="mt-4 text-center font-normal"
            >
              {errorMessage}
            </Typography>
          )}
        </div>
        {/* Render podcasts list */}
      </div>
    </>
  );
};

export default AdminPage;
