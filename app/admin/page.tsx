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

                {podcasts.length !==0 ? podcasts.map((podcast) => (
                <div
                    key={podcast.id}
                    className="font-semibold text-blue-gray-900 my-1 bg-gray-100 rounded-md"
                >
                    <div style={{display: "grid", gridTemplateColumns: "10fr 1fr 1fr", gridTemplateRows: "1fr"}}>
                        <div className="ml-5 my-auto">{podcast.title}</div>
                        <div>
                            <Button
                                    className="bg-[#1f8fff] hover:bg-[#1f8fff8c] my-1 ml-12 py-2 px-2 rounded items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                </svg>
                            </Button>
                        </div>
                        <div>
                            <Button
                                    className="bg-[#FF011C] hover:bg-[#ff011cb8] my-1 py-2 px-2 rounded items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
                )) : <div className="text-center text-2xl font-semibold text-blue-gray-900">No podcasts</div>}
            </div>
        </>
    );
};







export default AdminPage;
