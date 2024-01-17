import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function getFamily(cid: string) {
  const response = await fetch(`http://localhost:4000/family/${cid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
