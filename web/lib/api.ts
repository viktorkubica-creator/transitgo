export type JourneyOption = { summary: string; durationMinutes: number };

export async function searchJourneys(origin: string, destination: string): Promise<JourneyOption[]> {
  const url = new URL('http://localhost:3001/v1/journeys');
  url.searchParams.set('origin', origin);
  url.searchParams.set('destination', destination);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('failed');
  const json = await res.json();
  return json.options;
}
