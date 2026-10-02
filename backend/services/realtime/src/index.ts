import express from 'express';
import { realtimeRouter } from './routes/departures';

const app = express();
app.use(express.json());
app.use('/v1', realtimeRouter);

const port = process.env.PORT || 3002;
app.listen(port, () => {
  // Implements FR-007 (departures) and FR-009 (nearby stops) (TRGO-18)
  console.log(`Real-Time service listening on :${port}`);
});

export default app;
