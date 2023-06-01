import {deleteDoc, doc, updateDoc} from "@firebase/firestore/lite";
import {db} from "@/lib/firebase";

interface RequestBody {
    title: string;
    description: string;
    url: string;
}
export async function DELETE(request: Request, { params }: { params: { id: string } }){
    const podcastId = params.id
    await deleteDoc(doc(db, "podcasts", podcastId));
    const body = {
        id: podcastId
    };
    return new Response(JSON.stringify(body));
}
export async function PUT(request: Request, { params }: { params: { id: string } }){
    const { title, description, url }: RequestBody = await request.json();
    const podcastId = params.id

    await updateDoc(doc(db, "podcasts", podcastId), {title, description, url});

    const body = {
        id: podcastId,
        title: title,
        description: description,
        url: url
    };
    return new Response(JSON.stringify(body));
}
