import { cookies } from "next/headers";

export async function getAllFamilyMember() {
  const cookieStore = cookies();
  const token = cookieStore.get("key");

  const response = await fetch(`${process.env.URL}/member/family`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token?.value}`,
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
