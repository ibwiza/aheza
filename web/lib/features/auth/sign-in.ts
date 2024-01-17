import { IMutateSignIn } from "./types";

export async function signIn(data: IMutateSignIn) {

  const response = await fetch(`http://localhost:4000/auth/sign-in`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
