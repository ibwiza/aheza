import { IMutateNewFamily } from "./types";

export async function newFamily(data: IMutateNewFamily) {
  const response = await fetch(`http://localhost:4000/family/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
