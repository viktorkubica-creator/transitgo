import express from 'express';
import { getDeparturesForStop } from '../services/gtfsrt';

export const realtimeRouter = express.Router();

// GET /v1/departures/:stopId
// Implements FR-007, FR-009 (TRGO-18)
realtimeRouter.get('/departures/:stopId', async (req, res) => {
  const stopId = req.params.stopId;
  const board = await getDeparturesForStop(stopId);
  res.json(board);
});
