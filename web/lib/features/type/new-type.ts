import { IMutateNewType } from "./types";

export async function newType(data: IMutateNewType) {
  const response = await fetch(`http://localhost:4000/type/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
