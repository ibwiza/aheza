import { cookies } from "next/headers";

export async function getMemberContributions(memberId: string) {
  const cookieStore = cookies();
  const token = cookieStore.get("key");

  const response = await fetch(
    `${process.env.URL}/contribution/member/${memberId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token?.value}`,
      },
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse;
}
