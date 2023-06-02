import {addDoc, collection, getDocs, query, where} from "firebase/firestore/lite";
import {db} from "@/lib/firebase";

interface RequestBody {
    email: string;
}

export async function POST(request: Request) {
    const { email }: RequestBody = await request.json();
    const newsletterQuery = query(
        collection(db, "newsletter"),
        where("email", "==", email)
    );
    const newsletterDocs = await getDocs(newsletterQuery);
    if (!newsletterDocs.empty) {
        const body = {
            error: "Podcast already exists",
        };
        return new Response(JSON.stringify(body), { status: 409 });
    }

    await addDoc(collection(db, "newsletter"), {
        email: email,
    });
    const body = {
        email: email,
    };
    return new Response(JSON.stringify(body));
}