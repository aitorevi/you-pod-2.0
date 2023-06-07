"use client";

import {useEffect, useState} from "react";
import {Card, CardBody, CardHeader, Typography} from "@material-tailwind/react";

interface Podcast {
    id: string;
    title: string;
    description: string;
    url: string;
}
const PodcastsPage = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    useEffect(() => {
        fetchPodcasts();
    }, []);
    const fetchPodcasts = async () => {
        const response = await fetch("/api/podcasts");
        const data = await response.json();
        setPodcasts(data.podcasts);
    };
    return (
        <div className="container min-h-screen mx-auto max-w-screen-xl md:my-3 py-2">
                {podcasts.map((podcast) => (
                    <Card key={podcast.id} className="md:flex-row flex-col  max-w-[80rem] my-4">
                        <CardHeader shadow={false} floated={false} className="md:w-1.5/5 flex-shrink-0 md:shrink-0 md:m-0 md:rounded-r-none">
                            <img
                                src="/defaultImage.svg"
                                alt="image"
                                className="flex-row mx-auto h-[16rem] w-[16rem] md:w-[24rem] md:h-[24rem] md:p-3 md:m-0"
                            />
                        </CardHeader>
                        <CardBody>
                            <Typography variant="h6" color="blue" className="uppercase mb-4">{podcast.title}</Typography>
                            <Typography color="blue-gray" className="mb-2">
                                {podcast.description}
                            </Typography>
                            <audio className="mt-0 md:mt-3 mx-auto" controls src={podcast.url} />
                        </CardBody>
                    </Card>
                ))}
        </div>
    );
};
export default PodcastsPage;