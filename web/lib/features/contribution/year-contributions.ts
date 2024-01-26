import { IMutateYearContribution } from "./types";
import { cookies } from "next/headers";

export async function yearContributions(year: number, memberId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("key");

  const response = await fetch(`http://localhost:4000/contribution/member`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${token?.value}`,
    },
    body: JSON.stringify({ year, memberId }),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
