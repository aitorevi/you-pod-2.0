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
    const [uploading, setUploading] = useState(false);

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
    const validateSchema = z.object({
        title: z.string().min(3, "Esto es un error personalizado").max(100),
        description: z.string().min(3).max(100),
        url: z.string().min(3).max(100),
    });

    const handleSubmit = async (e: any) => {

        e.preventDefault();

        const podcastData = {
            title,
            description,
            url,
        };

        // handleFile();
        try {
            const validatedForm = validateSchema.parse(podcastData);
            // console.log(validatedForm);
            const response = await fetch("/api/podcasts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(podcastData),
            });

            if (response.ok) {
                ///handleOpen();
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
                // console.log(response);
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
    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0].type);
    };
    const handleFile = () => {
        if (file) {
            setUploading(true);
            // :TODO: Validar que el archivo sea de tipo audio/mpeg
            if (file.type !== 'audio/mpeg') {
                console.error('File type must be "audio/mpeg"');
                return;
            }
            const metadata = {
                contentType: 'audio/mpeg'
            };

            const storageRef = ref(storage, `images/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);

            uploadTask.on('state_changed', (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, (error) => {
                console.error(error);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUploading(false);
                    console.log(downloadURL);
                    setUrl(downloadURL.valueOf());
                    console.log(url);
                    // Guardar la url en la base de datos
                });

            });
        }
    };

    return (
        <>
            <div className="container h-screen mx-auto max-w-screen-xl my-3 rounded-lg shadow-md px-4 py-2">
                <h1 className="text-4xl font-bold text-center text-blue-gray-900">
                    Administration panel
                </h1>
                <PodcastModal
                    btnTitle="New Podcast"
                    btnColor="green"
                    title="Create Podcast"
                    handleSubmit={handleSubmit}>
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
                    {/*<Input*/}
                    {/*    id="url"*/}
                    {/*    type={url}*/}
                    {/*    label="Url"*/}
                    {/*    size="lg"*/}
                    {/*    value={url}*/}
                    {/*    onChange={(e) => setUrl(e.target.value)}*/}
                    {/*/>*/}
                    <Input
                        id="mp3"
                        type="file"
                        label="Mp3"
                        size="lg"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                    />
                    <Button onClick={handleFile} disabled={!file || uploading}>Subir archivo</Button>
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