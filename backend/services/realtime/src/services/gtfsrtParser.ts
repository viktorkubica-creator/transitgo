// Implements FR-007, FR-009 (TRGO-18) — Departure board response shape.
// Fix for [TRAINING] demo case: spec-vs-code drift (TRGO-86 / TRGO-30).
//
// Changes from the buggy version (commit 2616178):
//   1. Replaces `new Date(...).toISOString()` with an offset-aware formatter
//      using `Intl.DateTimeFormat` and `timeZone: 'Europe/Bratislava'`.
//      `toISOString()` always returns UTC (`Z` suffix) and ignores DST.
//   2. Emits the five fields the Solution Design (Confluence 6.2) requires:
//      `generatedAt` (top level), `scheduled`, `expected`, `realtime`, `mode`.
//   3. Keeps `plannedTime` and `expectedInMinutes` for backwards compatibility
//      with the existing iOS/Android clients (TRGO-18 acceptance criteria).

export type VehicleUpdate = {
  tripId: string;
  stopId: string;
  line: string;
  destination: string;
  mode: 'TRAM' | 'BUS' | 'TROLLEYBUS';
  plannedDepartureEpochMs: number;
  delaySeconds: number; // positive = late, 0 = scheduled-only
};

const TIMEZONE = 'Europe/Bratislava';

const fmtOffsetDateTime = (epochMs: number): string => {
  // 'sv-SE' gives ISO-8601-ish output, e.g. "2026-10-28 08:05:12".
  // `timeZoneName: 'longOffset'` appends "+01:00" / "+02:00" depending on DST.
  return new Intl.DateTimeFormat('sv-SE', {
    timeZone: TIMEZONE,
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'longOffset',
  })
    .format(new Date(epochMs))
    .replace(' ', 'T');
};

const fmtHHmm = (epochMs: number): string =>
  new Intl.DateTimeFormat('sv-SE', {
    timeZone: TIMEZONE,
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(epochMs));

export function parseMockFeed(json: any): VehicleUpdate[] {
  if (!json || !Array.isArray(json.entities)) return [];
  return json.entities
    .map((e: any) => ({
      tripId: String(e.tripId),
      stopId: String(e.stopId),
      line: String(e.line),
      destination: String(e.destination),
      mode: (e.mode as VehicleUpdate['mode']) ?? 'BUS',
      plannedDepartureEpochMs: Number(e.plannedMs),
      delaySeconds: Number(e.delaySec || 0),
    }))
    .filter((v: VehicleUpdate) => v.tripId && v.stopId);
}

export function toDepartureBoard(feed: VehicleUpdate[], stopId: string, nowMs: number = Date.now()) {
  const items = feed
    .filter((v: VehicleUpdate) => v.stopId === stopId)
    .map((v: VehicleUpdate) => {
      const expectedMs = v.plannedDepartureEpochMs + v.delaySeconds * 1000;
      const hasRealtime = v.delaySeconds > 0;
      return {
        line: v.line,
        destination: v.destination,
        mode: v.mode,
        // BACKWARDS-COMPAT: keep `plannedTime` as full ISO-with-offset string.
        plannedTime: fmtOffsetDateTime(v.plannedDepartureEpochMs),
        // NEW: per Solution Design §4
        scheduled: fmtHHmm(v.plannedDepartureEpochMs),
        expected: hasRealtime ? fmtOffsetDateTime(expectedMs) : null,
        realtime: hasRealtime,
        countdownMin: Math.max(0, Math.round((expectedMs - nowMs) / 60000)),
      };
    })
    .sort((a, b) => a.countdownMin - b.countdownMin)
    .slice(0, 10);

  return {
    stopId,
    // NEW: top-level `generatedAt` with offset (Solution Design §4).
    generatedAt: fmtOffsetDateTime(nowMs),
    departures: items,
  };
}
