import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export async function getSession() {
    const session = await auth();

    if (!session?.user.id) {
        return redirect("/");
    }

    return session;
}