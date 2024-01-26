export async function isFatherUpdate(memberId: string) {
  const response = await fetch(
    `http://localhost:4000/family/father/${memberId}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse;
}