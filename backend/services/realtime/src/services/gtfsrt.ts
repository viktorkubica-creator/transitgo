type Departure = {
  line: string;
  destination: string;
  plannedTime: string;
  expectedInMinutes: number;
};

export async function getDeparturesForStop(stopId: string) {
  const now = new Date();
  const mk = (m: number): Departure => ({
    line: '4',
    destination: 'City Center',
    plannedTime: new Date(now.getTime() + m * 60000).toISOString(),
    expectedInMinutes: m
  });
  return {
    stopId,
    departures: [mk(2), mk(7), mk(12)]
  };
}
