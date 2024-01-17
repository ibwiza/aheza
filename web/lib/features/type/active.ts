export async function activeType(active: boolean, cid: string) {
  const response = await fetch(`http://localhost:4000/type/${cid}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ active: active }),
  });

  const jsonResponse = await response.json();
  return jsonResponse;
}
