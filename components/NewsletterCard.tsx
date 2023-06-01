"use client";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button, Input,
} from "@material-tailwind/react";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

export default function NewsletterCard() {

    return (
        <Card className="flex-row w-full max-w-[48rem] shadow-xl">
            <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                    alt="image"
                    className="w-full h-full object-cover"
                />
            </CardHeader>
            <CardBody>
                <Typography variant="h6" color="blue" className="uppercase mb-4">newsletter</Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                    Both software development and personal development.
                </Typography>
                <Typography color="gray" className="font-normal mb-6">
                    Want to be notified by email when I publish new blog posts or new podcasts? No advertising, just emails when there are new posts.
                </Typography>
                <div className="flex flex-col mb-2">
                    <Input type="email" label="Email" size="lg" />
                </div>

                <a className="inline-block">
                    <Button variant="text" className="flex items-center gap-2">
                        Register in
                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                    </Button>
                </a>
            </CardBody>
        </Card>
    );
}