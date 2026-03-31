import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MessagesRedirect() {
  const session = await auth();
  const role = (session?.user as unknown as Record<string, unknown>)?.role;
  redirect(role === "BUSINESS" ? "/dashboard/business/messages" : "/dashboard/creator/messages");
}
