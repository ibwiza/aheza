import { IMutateNewContribution } from "./types";

export async function newContribution(
  data: IMutateNewContribution,
  memberId: string
) {
  const { amount, year } = data;
  const response = await fetch(`http://localhost:4000/contribution`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, year, memberId }),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
