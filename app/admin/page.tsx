"use client";
import React, {useEffect, useState} from "react";
import {
    Button,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import {PodcastModal} from "@/components/PodcastModal";

interface Podcast {
    id: string;
    title: string;
    description: string;
    url: string;
}

const AdminPage = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [open, setOpen] = useState<boolean>(false);
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    useEffect(() => {
        fetchPodcasts();
    }, []);
    const fetchPodcasts = async () => {
        const response = await fetch("/api/podcasts");
        const data = await response.json();
        setPodcasts(data.podcasts);
    };
    const handleOpen = () => setOpen((cur) => !cur);

    function resetStateOfInputs() {
        setTitle("");
        setDescription("");
        setUrl("");
    }

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
                fetchPodcasts();
                resetStateOfInputs();
                //router.push("/admin");
            } else {
                const data = await response.json();
                setErrorMessage(data.error || "An error occurred.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setErrorMessage("An error occurred. Please try again."); // Set a generic error message
        }
    };

    const handleDelete = async (podcastId: string) => {
        try {
            const response = await fetch(`/api/podcasts/${podcastId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                setPodcasts(prevPodcasts => prevPodcasts.filter(podcast => podcast.id !== podcastId));
            } else {
                const data = await response.json();
                setErrorMessage(data.error || "An error occurred.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setErrorMessage("An error occurred. Please try again."); // Set a generic error message
        }
    }
    const handleOpenUpdate = async (podcastId: string) => {
        const podcast = podcasts.find(podcast => podcast.id === podcastId);
        if (podcast) {
            setTitle(podcast.title);
            setDescription(podcast.description);
            setUrl(podcast.url);
        }
    }
    const handleUpdate = async (e: any, podcastId: string) => {
        e.preventDefault();
        const podcastData = {
            id: podcastId,
            title: title,
            description: description,
            url: url,
        };
        try {
            const response = await fetch(`/api/podcasts/${podcastId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(podcastData),
            });
            if (response.ok) {
                fetchPodcasts();
                resetStateOfInputs();
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
            <div className="container h-screen mx-auto max-w-screen-xl my-3 rounded-lg shadow-md px-4 py-2">
                <h1 className="text-4xl font-bold text-center text-blue-gray-900">
                    Administration panel
                </h1>
                <PodcastModal btnTitle="New Podcast" title="Create Podcast" handleSubmit={handleSubmit}>
                    <Input
                        id="title"
                        type="text"
                        label="Title"
                        size="lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        id="description"
                        label="Description"
                        size="lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        id="url"
                        type={url}
                        label="Url"
                        size="lg"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </PodcastModal>
                {errorMessage && (
                    <Typography
                        id="error-message"
                        color="red"
                        className="mt-4 text-center font-normal"
                    >
                        {errorMessage}
                    </Typography>
                )}
                {podcasts.length !== 0 ? podcasts.map((podcast) => (
                    <div
                        key={podcast.id}
                        className="font-semibold text-blue-gray-900 my-1 bg-gray-100 rounded-md"
                    >
                        <div style={{display: "grid", gridTemplateColumns: "10fr 1fr 1fr", gridTemplateRows: "1fr"}}>
                            <div className="ml-5 my-auto">{podcast.title}</div>
                            <div className="flex my-1 justify-end">
                                <PodcastModal btnTitle="Edit" title="Edit Podcast" handleSubmit={(e:any) => {handleUpdate(e, podcast.id)}} handleOpenUpdate={() => handleOpenUpdate(podcast.id)}>
                                    <Input
                                        id="title"
                                        type="text"
                                        label="Title"
                                        size="lg"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Textarea
                                        id="description"
                                        label="Description"
                                        size="lg"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    <Input
                                        id="url"
                                        type="url"
                                        label="Url"
                                        size="lg"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </PodcastModal>
                                <Button
                                    onClick={(event) => {
                                        handleDelete(podcast.id)
                                    }}
                                    className="mx-3 bg-red-700">
                                    Delete
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