import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore/lite";

interface RequestBody {
    title: string;
    description: string;
    url: string;
}

export async function POST(request: Request) {
    const { title, description , url }: RequestBody = await request.json();
    const podcastsQuery = query(
        collection(db, "podcasts"),
        where("title", "==", title)
    );
    const podcastsDocs = await getDocs(podcastsQuery);
    if (!podcastsDocs.empty) {
        const body = {
            error: "Podcast already exists",
        };
        return new Response(JSON.stringify(body), { status: 409 });
    }

    await addDoc(collection(db, "podcasts"), {
        title: title,
        description: description,
        url: url,
    });
    const body = {
        title: title,
        description: description,
        url: url,
    };
    return new Response(JSON.stringify(body));
}


export async function GET(request: Request) {
    // TODO: To be implemented
    const { title }: RequestBody = await request.json();
    const podcastsQuery = query(
        collection(db, "podcasts")
    );
    const podcastsDocs = await getDocs(podcastsQuery);
    const body = {
        podcastsDocs
    };
    return new Response(JSON.stringify(body));
}