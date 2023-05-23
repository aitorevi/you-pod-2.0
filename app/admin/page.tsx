"use client";
import React, {useEffect, useState} from "react";
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
import {useRouter} from "next/navigation";

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
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    useEffect(() => {
        const fetchPodcasts = async () => {
            const response = await fetch("/api/podcasts");
            const data = await response.json();
            setPodcasts(data.podcasts);
        };
        fetchPodcasts();
    }, []);
    console.log(podcasts);
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



    return (
        <>
            <div className="container mx-auto max-w-screen-xl h-full my-3 rounded-lg shadow-md px-4 py-2">
                    <h1 className="text-4xl font-bold text-center text-blue-gray-900">
                        Administration panel
                    </h1>

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
                <div className="grid lg:grid-cols-5 md:grid-cols-4 gap-4 mt-4 sm:grid-cols-2 justify-center">
                    {podcasts.length !==0 ? podcasts.map((podcast) => (
                        <Card
                            key={podcast.id}
                            className="w-48 mx-3">
                            <CardHeader floated={false} className="h-40">
                                <img src={'defaultImage.svg'} alt="default-picture" />
                            </CardHeader>
                            <CardBody className="text-center">
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    {podcast.title}
                                </Typography>
                            </CardBody>
                            <Button className="mx-2 mb-2 bg-orange-600">Edit</Button>
                            <Button className="mx-2 mb-2 bg-red-600">Delete</Button>
                        </Card>
                    ))
                    : <Typography color="white" variant="h5">No podcasts</Typography>}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
