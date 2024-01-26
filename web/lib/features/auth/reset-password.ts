import { IMutateResetPassword, IMutateSignIn } from "./types";

export async function resetPassword(data: IMutateResetPassword) {
  const response = await fetch(`http://localhost:4000/auth/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
