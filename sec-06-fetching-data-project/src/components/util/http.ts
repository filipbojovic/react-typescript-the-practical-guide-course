export async function get(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data.");
  }

  // better to set unknown as the return type because it forces us at some point to
  // set the type of our data
  const data = (await response.json()) as unknown;
  return data;
}
