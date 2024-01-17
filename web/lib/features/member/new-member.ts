import { IMutateNewMember } from "./types";

export async function newMember(data: IMutateNewMember, familyId: number) {
  const { email, names, phone } = data;

  const response = await fetch(`http://localhost:4000/member/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      names,
      phone,
      familyId: familyId,
    }),
  });
  const jsonResponse = await response.json();
  return jsonResponse;
}
