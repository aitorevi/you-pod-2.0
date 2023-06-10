"use client";
import {useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import {storage} from "@/lib/firebase";
import {Button} from "@material-tailwind/react";

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const handleUploadClick = () => {
        if (file) {
            setUploading(true);

            const metadata = {
                contentType: 'image/jpeg'
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
                    console.log(downloadURL)
                    // Guardar la url en la base de datos
                });

            });
        }
    };

    return (
        <div>
            <span>
            <input
                type="file"
                name="myFile"
                id="myFile"
                placeholder="Na de na"
                onChange={handleFileChange} />
                <label>
                <span>Subelo</span>
            </label>
            </span>

            <Button onClick={handleUploadClick} disabled={!file || uploading}>Subir archivo</Button>

            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload
                file</label>
            <input
                className="block w-full text-sm border border-gray rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray dark:border-gray-600 dark:placeholder-gray-400"
                id="file_input" type="file" />
        </div>
    );
}