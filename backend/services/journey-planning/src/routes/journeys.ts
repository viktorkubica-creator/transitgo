import express from 'express';
import { planJourney } from '../services/otpAdapter';
import { autocompletePlaces } from '../data/network';
import { routeJourneys } from '../services/routing';

export const journeysRouter = express.Router();

// GET /v1/journeys
// Implements FR-001, FR-002, FR-003 (TRGO-20)
journeysRouter.get('/journeys', async (req, res) => {
  try {
    const origin = String(req.query.origin || '');
    const destination = String(req.query.destination || '');
    const time = req.query.time ? new Date(String(req.query.time)) : undefined;
    const arriveBy = String(req.query.arriveBy || 'false') === 'true';
    const accessibility = (String(req.query.accessibility || 'any') as 'step_free' | 'any');
    const maxWalkMeters = req.query.maxWalkMeters ? Number(req.query.maxWalkMeters) : undefined;

    if (!origin || !destination) {
      return res.status(400).json(apiError('VALIDATION_ERROR', 'origin and destination are required'));
    }

    // Using mocked router; `planJourney` remains as a simple passthrough sample
    const options = routeJourneys({ origin, destination, time, arriveBy, accessibility, maxWalkMeters });
    res.json({ options });
  } catch (err: any) {
    const code = err.code || 'INTERNAL_ERROR';
    const status = code === 'INVALID_LOCATION' || code === 'SAME_LOCATION' || code === 'WALK_TOO_FAR' ? 400 : 500;
    res.status(status).json(apiError(code, err.message, err.details));
  }
});

// GET /v1/places/autocomplete – Implements TRGO-68 subtask (design contract)
journeysRouter.get('/places/autocomplete', async (req, res) => {
  const q = String(req.query.q || '');
  if (!q) return res.status(400).json(apiError('VALIDATION_ERROR', 'query q is required'));
  res.json({ items: autocompletePlaces(q, 8) });
});

function apiError(code: string, message: string, details?: unknown) {
  return { error: { code, message, details } };
}
