import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { signJwtAccessToken } from "@/lib/jwt";
import * as bcrypt from "bcrypt";
import { db } from "@/lib/firebase";

interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  const q = query(collection(db, "users"), where("username", "==", body.username));
  const userDocs = await getDocs(q);
  const user: any = userDocs.docs.map(doc => doc.data())[0];
  if (user && (await bcrypt.compare(body.password, user.password))) {
    const { password, ...userWithoutPass } = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken,
    };
    return new Response(JSON.stringify(result));
  }
  return new Response(JSON.stringify(null));
}
