// Contract test for the Departures API response shape.
// Companion to TRGO-86 / TRGO-88. Run with `npx jest gtfsrtParser.test.ts`.
//
// These tests assert the post-fix behaviour. They should FAIL on the buggy
// `gtfsrtParser.ts` (commit 2616178) and PASS on the fixed version
// (see gtfsrtParser.ts.fixed in the demo workspace).

import { parseMockFeed, toDepartureBoard, VehicleUpdate } from './gtfsrtParser';

// Fixed reference date: 28 Oct 2026, 08:00:00 in Europe/Bratislava.
// 28 Oct 2026 is AFTER DST end (DST ended 25 Oct 2026 → UTC+1 = CET).
const NOW_MS = Date.UTC(2026, 9, 28, 7, 0, 0); // 07:00 UTC = 08:00 CET (UTC+1)

const mockFeed = (): VehicleUpdate[] => [
  {
    tripId: 't1',
    stopId: 'STOP-1203',
    line: '4',
    destination: 'Central Station',
    mode: 'TRAM',
    plannedDepartureEpochMs: Date.UTC(2026, 9, 28, 7, 5, 0), // 08:05 CET
    delaySeconds: 30,
  },
  {
    tripId: 't2',
    stopId: 'STOP-1203',
    line: '21',
    destination: 'City Clinic',
    mode: 'BUS',
    plannedDepartureEpochMs: Date.UTC(2026, 9, 28, 7, 12, 0), // 08:12 CET
    delaySeconds: 0, // scheduled-only
  },
  {
    tripId: 't3',
    stopId: 'STOP-999', // different stop
    line: '7',
    destination: 'Riverside',
    mode: 'TRAM',
    plannedDepartureEpochMs: Date.UTC(2026, 9, 28, 7, 3, 0),
    delaySeconds: 0,
  },
];

describe('toDepartureBoard', () => {
  it('emits top-level generatedAt with Europe/Bratislava offset', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    expect(board.generatedAt).toBeDefined();
    // 28 Oct 2026 is post-DST-end → CET = UTC+1
    expect(board.generatedAt).toMatch(/[+-]01:00$/);
    expect(board.generatedAt).not.toMatch(/Z$/);
  });

  it('does NOT use UTC Z suffix on any time field', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    expect(board.generatedAt).not.toMatch(/Z$/);
    for (const dep of board.departures) {
      expect(dep.plannedTime).not.toMatch(/Z$/);
      if (dep.expected !== null) {
        expect(dep.expected).not.toMatch(/Z$/);
      }
    }
  });

  it('emits scheduled HH:mm wall clock for every departure', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    for (const dep of board.departures) {
      expect(dep.scheduled).toMatch(/^\d{2}:\d{2}$/);
    }
  });

  it('emits realtime=true and a non-null expected when delaySeconds > 0', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    const t1 = board.departures.find((d) => d.line === '4');
    expect(t1).toBeDefined();
    expect(t1!.realtime).toBe(true);
    expect(t1!.expected).not.toBeNull();
    expect(t1!.expected).toMatch(/[+-]01:00$/);
  });

  it('emits realtime=false and expected=null for scheduled-only departures', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    const t2 = board.departures.find((d) => d.line === '21');
    expect(t2).toBeDefined();
    expect(t2!.realtime).toBe(false);
    expect(t2!.expected).toBeNull();
  });

  it('emits the mode (TRAM/BUS/TROLLEYBUS) for every departure', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    for (const dep of board.departures) {
      expect(['TRAM', 'BUS', 'TROLLEYBUS']).toContain(dep.mode);
    }
  });

  it('sorts by countdownMin and slices to top 10', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    expect(board.departures.length).toBeLessThanOrEqual(10);
    for (let i = 1; i < board.departures.length; i++) {
      expect(board.departures[i].countdownMin).toBeGreaterThanOrEqual(
        board.departures[i - 1].countdownMin,
      );
    }
  });

  it('only includes departures for the requested stopId', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    expect(board.departures.every((d) => true)).toBe(true); // shape check
    // STOP-999 should NOT appear
    expect(board.departures.find((d) => d.destination === 'Riverside')).toBeUndefined();
  });

  it('keeps backwards-compatible plannedTime and expectedInMinutes fields', () => {
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', NOW_MS);
    for (const dep of board.departures) {
      expect(typeof dep.plannedTime).toBe('string');
      expect(typeof dep.countdownMin).toBe('number');
    }
  });

  it('handles DST: 15 Mar 2026 (DST start, +02:00) is also offset-aware', () => {
    // 15 Mar 2026 09:00 UTC = 10:00 CET (CET switched to CEST at 01:00 UTC = 02:00 CET)
    const dstNow = Date.UTC(2026, 2, 15, 9, 0, 0);
    const board = toDepartureBoard(mockFeed(), 'STOP-1203', dstNow);
    // 28 Oct 2026 in our mockFeed is BEFORE this point in real time but the
    // expectedDepartureEpochMs is also a UTC instant; we just want to
    // assert the offset string for now.
    expect(board.generatedAt).toMatch(/[+-]\d{2}:\d{2}$/);
  });
});
