import {
  IMutateNewPassword,
  IMutateResetPassword,
  IMutateSignIn,
} from "./types";

export async function newPassword(
  data: IMutateNewPassword,
  token?: string | null
) {
  const response = await fetch(
    `http://localhost:4000/auth/newPassword/${token}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse;
}
