"use client";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button, Input,
} from "@material-tailwind/react";
import {ArrowLongRightIcon} from "@heroicons/react/24/outline";
import {useState} from "react";

export default function NewsletterCard() {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const newsletterData = {
            email,
        };
        try {
            const response = await fetch("/api/newsletter", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newsletterData),
            });
            if (response.ok) {
                alert("You have been registered in the newsletter");
                setEmail("");
            } else {
                const data = await response.json();
                setErrorMessage(data.error || "An error occurred.");
                alert("Error, you are already subscribed to the newsletter.");
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setErrorMessage("An error occurred. Please try again."); // Set a generic error message
        }
    }
    return (
        <Card className="flex-row w-full max-w-[48rem] shadow-xl mx-5">
            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                <img
                    src="/newsletter.png"
                    alt="image"
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h6" color="blue" className="uppercase mb-4">newsletter</Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Both software development and personal development.
                </Typography>
                <Typography
                    color="gray"
                    className="font-normal mb-6">
                    Want to be notified by email when I publish new blog posts or new podcasts? No advertising, just
                    emails when there are new posts.
                </Typography>
                <div className="container">
                    <div
                        className="flex flex-col mb-2">
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            id="email"
                            label="Email"
                            value={email}
                            size="lg"/>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        variant="text"
                        className="flex items-center gap-2">
                        Register in
                        <ArrowLongRightIcon
                            strokeWidth={2}
                            className="w-4 h-4"/>
                    </Button>
                </div>

            </CardBody>
        </Card>
    );
}