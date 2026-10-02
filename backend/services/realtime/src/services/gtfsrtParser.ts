// Minimal GTFS-RT parser for mocked feed (JSON shape for training)
export type VehicleUpdate = {
  tripId: string;
  stopId: string;
  line: string;
  destination: string;
  plannedDepartureEpochMs: number;
  delaySeconds: number; // positive = late
};

export function parseMockFeed(json: any): VehicleUpdate[] {
  if (!json || !Array.isArray(json.entities)) return [];
  return json.entities
    .map((e: any) => ({
      tripId: String(e.tripId),
      stopId: String(e.stopId),
      line: String(e.line),
      destination: String(e.destination),
      plannedDepartureEpochMs: Number(e.plannedMs),
      delaySeconds: Number(e.delaySec || 0)
    }))
    .filter((v: VehicleUpdate) => v.tripId && v.stopId);
}

export function toDepartureBoard(feed: VehicleUpdate[], stopId: string) {
  const items = feed
    .filter((v: VehicleUpdate) => v.stopId === stopId)
    .map((v: VehicleUpdate) => {
      const planned = new Date(v.plannedDepartureEpochMs);
      const expectedMs = v.plannedDepartureEpochMs + v.delaySeconds * 1000;
      const expectedInMinutes = Math.max(0, Math.round((expectedMs - Date.now()) / 60000));
      return {
        line: v.line,
        destination: v.destination,
        plannedTime: planned.toISOString(),
        expectedInMinutes
      };
    })
    .sort((a, b) => a.expectedInMinutes - b.expectedInMinutes)
    .slice(0, 10);
  return { stopId, departures: items };
}
