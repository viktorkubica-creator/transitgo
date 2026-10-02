import express from 'express';
import { planJourney } from '../services/otpAdapter';

export const journeysRouter = express.Router();

// GET /v1/journeys
// Implements FR-001, FR-002, FR-003 (TRGO-20)
journeysRouter.get('/journeys', async (req, res) => {
  const origin = String(req.query.origin || '');
  const destination = String(req.query.destination || '');
  const time = req.query.time ? new Date(String(req.query.time)) : undefined;
  const arriveBy = String(req.query.arriveBy || 'false') === 'true';

  if (!origin || !destination) {
    return res.status(400).json({ error: 'origin and destination are required' });
  }

  const options = await planJourney({ origin, destination, time, arriveBy });
  res.json({ options });
});
