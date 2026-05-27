export async function getPatients() {
  const res = await fetch(import.meta.env.VITE_API_URL);

  if (!res.ok) throw new Error('Failed to fetch patients');

  return res.json();
}