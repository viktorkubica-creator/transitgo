import express from 'express';
import { getDeparturesForStop } from '../services/gtfsrt';
import { InMemoryCache } from '../services/cache';
import { parseMockFeed, toDepartureBoard } from '../services/gtfsrtParser';

export const realtimeRouter = express.Router();
const cache = new InMemoryCache();

// GET /v1/departures/:stopId
// Implements FR-007, FR-009 (TRGO-18)
realtimeRouter.get('/departures/:stopId', async (req, res) => {
  const stopId = req.params.stopId;
  // cache hit
  const cached = cache.get<any>(`dep:${stopId}`);
  if (cached) return res.json(cached);
  // mock feed and parse
  const feed = parseMockFeed(mockFeed());
  const board = toDepartureBoard(feed, stopId);
  cache.set(`dep:${stopId}`, board, 10_000);
  res.json(board);
});

// GET /v1/nearby?lat&lng&radius
realtimeRouter.get('/nearby', (req, res) => {
  const lat = Number(req.query.lat);
  const lng = Number(req.query.lng);
  const radius = Number(req.query.radius || 300);
  if (!isFinite(lat) || !isFinite(lng)) {
    return res.status(400).json({ error: { code: 'VALIDATION_ERROR', message: 'lat and lng are required' } });
  }
  // mocked: return a couple of nearby stops
  res.json({
    items: [
      { id: 'STOP-A', name: 'Main Station', distanceMeters: 120 },
      { id: 'STOP-B', name: 'Old Town', distanceMeters: 260 }
    ],
    radius
  });
});

function mockFeed() {
  const now = Date.now();
  return {
    entities: [
      { tripId: 't1', stopId: 'STOP123', line: '4', destination: 'City Center', plannedMs: now + 2 * 60000, delaySec: 30 },
      { tripId: 't2', stopId: 'STOP123', line: '1', destination: 'Old Town', plannedMs: now + 7 * 60000, delaySec: 120 },
      { tripId: 't3', stopId: 'STOP999', line: '7', destination: 'Riverside', plannedMs: now + 3 * 60000, delaySec: 0 }
    ]
  };
}
