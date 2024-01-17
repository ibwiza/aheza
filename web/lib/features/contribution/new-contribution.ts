import { IMutateNewContribution } from "./types";

export async function newContribution(data: IMutateNewContribution,cid:string) {
  
  const response = await fetch(
    `http://localhost:4000/contribution/${cid}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse;
}
