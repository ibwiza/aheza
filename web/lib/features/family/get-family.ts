import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export async function getFamily(id: string) {
  const response = await fetch(`http://localhost:4000/family/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
