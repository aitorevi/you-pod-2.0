import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    getDocs, orderBy,
    query,
    where,
} from "firebase/firestore/lite";
import moment from "moment";

interface RequestBody {
    title: string;
    description: string;
    url: string;
}

export async function POST(request: Request) {
    const { title, description, url }: RequestBody = await request.json();
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
    const currentDate = new Date();
    const currentDateIso8601 = moment(currentDate).toISOString();
    await addDoc(collection(db, "podcasts"), {
        title: title,
        description: description,
        url: url,
        createAt: currentDateIso8601,
    });
    const body = {
        title: title,
        description: description,
        url: url,
        createAt: currentDateIso8601,
    };
    return new Response(JSON.stringify(body));
}


export async function GET(request: Request) {
    const podcastsQuery = query(collection(db, "podcasts"), orderBy("createAt", "desc"));
    const podcastsDocs = await getDocs(podcastsQuery);
    const podcasts = podcastsDocs.docs.map((doc) => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })
    const body = {
        podcasts
    };
    return new Response(JSON.stringify(body));
}

