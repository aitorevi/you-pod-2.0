import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dialog,
    Typography
} from "@material-tailwind/react";
import React, {useState} from "react";

export const PodcastModal = ({ btnTitle, btnColor, title, handleSubmit, children, handleOpenUpdate }: any) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => {
        if(handleOpenUpdate) {
            handleOpenUpdate()
        }
        setOpen(true)
    }

    const handleSubmitInModal = (e: any) => {
        handleSubmit(e)
        // : TODO: fix this, close modal after submit when validate is true
        setOpen(false)
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                color={btnColor}>
                {btnTitle}
            </Button>
            <Dialog
                size="lg"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem] dark:bg-gray-900">
                    <CardHeader
                        variant="gradient"
                        color="blue"
                        className="mb-4 grid h-28 place-items-center"
                    >
                        <Typography variant="h3" color="white">
                            {title}
                        </Typography>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        {children}
                    </CardBody>
                    <CardFooter className="pt-0 justify-center ">
                        <Button
                            variant="gradient"
                            onClick={(e) => handleSubmitInModal(e)}
                            fullWidth>
                            {title}
                        </Button>
                    </CardFooter>
                </Card>
            </Dialog>
        </>
    )
}
