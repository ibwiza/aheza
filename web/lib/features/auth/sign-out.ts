import { cookies } from "next/headers";

export async function signOut() {
  const cookieStore = cookies();
  cookieStore.delete("key");
}
