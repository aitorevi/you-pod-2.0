"use client";
import React, {useEffect, useState} from "react";
import {
    Button,
    Input,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import {PodcastModal} from "@/components/PodcastModal";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "@/lib/firebase";
import {z, ZodError} from "zod";

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
    const [file, setFile] = useState<File | null>(null);
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    useEffect(() => {
        fetchPodcasts();
    }, []);
    const fetchPodcasts = async () => {
        const response = await fetch("/api/podcasts");
        const data = await response.json();
        setPodcasts(data.podcasts);
    };

    function resetStateOfInputs() {
        setTitle("");
        setDescription("");
        setUrl("");
    }
    const validateSchema = z.object({
        title: z.string().min(3, "Title is required").max(100, "Title too long"),
        description: z.string().min(3, "Description is required").max(100, "Description too long"),
        url: z.string().min(8, "File is required and type 'audio/mpeg").max(1000, "Url too long"),
    });

    const handleCreatePodcast = async (url: string) => {
        const podcastData = {
            title,
            description,
            url,
        };
        try {
            validateSchema.parse(podcastData);
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
                setErrorMessage("")

            } else {
                const data = await response.json();
                setErrorMessage(data.error || "An error occurred.");
            }
        } catch (error) {
            if(error instanceof ZodError) {
                const response = (error.issues.map(issue => ({message: issue.message})).map(issue => issue.message).join(", "));
                setErrorMessage(response);
            }
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
            setErrorMessage("An error occurred. Please try again.");
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
    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };
    const handleFile = async (e: any) => {
        e.preventDefault();
        if (file) {
            if (file.type !== 'audio/mpeg') {
                await handleCreatePodcast("")
                return;
            }else{
                const metadata = {
                    contentType: 'audio/mpeg'
                };
                const storageRef = ref(storage, `podcasts/${file.name}`);
                const uploadTask = uploadBytesResumable(storageRef, file, metadata);
                let fileUrl = ""
                uploadTask.on('state_changed', (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                }, (error) => {
                    console.error(error);
                }, async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                    fileUrl = downloadURL.valueOf();
                    await handleCreatePodcast(fileUrl);
                });
            }
        } else {
            await handleCreatePodcast("")
        }
    };

    return (
        <>
            <div className="container h-screen mx-auto max-w-screen-xl my-3 rounded-lg shadow-md px-4 py-2">
                <h1 className="text-4xl font-bold text-center text-blue-gray-900 dark:text-white">
                    Administration panel
                </h1>
                <PodcastModal
                    btnTitle="New Podcast"
                    btnColor="green"
                    title="Create Podcast"
                    handleSubmit={handleFile}>
                    <Input
                        className="dark:text-white"
                        id="title"
                        type="text"
                        label="Title"
                        size="lg"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Textarea
                        className="dark:text-white"
                        id="description"
                        label="Description"
                        size="lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        className="cursor-pointer dark:text-white"
                        id="mp3"
                        type="file"
                        label="Mp3"
                        size="lg"
                        onChange={handleFileChange}
                    />
                </PodcastModal>
                {errorMessage && (
                    <Typography
                        id="error-message"
                        color="red"
                        className="mt-4 text-center font-normal"
                    >
                        `{errorMessage}`
                    </Typography>
                )}
                {podcasts.length !== 0 ? podcasts.map((podcast) => (
                    <div
                        key={podcast.id}
                        className="font-semibold text-blue-gray-900 my-1 bg-gray-100 rounded-md dark:bg-gray-800 dark:text-white">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="ml-5 my-auto text-center md:text-left">{podcast.title}</div>
                            <div className="flex my-1 justify-center md:justify-end">
                                <PodcastModal
                                    btnTitle="Edit"
                                    btnColor="orange"
                                    title="Edit Podcast"
                                    handleSubmit={(e: any) => {
                                        handleUpdate(e, podcast.id)
                                    }}
                                    handleOpenUpdate={() => handleOpenUpdate(podcast.id)}>
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
                                    onClick={() => {
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