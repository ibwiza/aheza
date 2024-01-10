import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function getUserContribution() {
  const cookieStore = cookies();
  const token = cookieStore.get("key");

  const response = await fetch(`http://localhost:4000/contribution`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token?.value}`,
    },
  });

  const jsonResponse = await response.json();
  console.log(jsonResponse);
  return jsonResponse;
}
