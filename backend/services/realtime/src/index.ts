import express from 'express';
import { realtimeRouter } from './routes/departures';
import { alertsRouter } from './routes/alerts';
import { requestIdMiddleware } from '@transitgo/common/src/requestId';
import { errorHandler } from '@transitgo/common/src/errors';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', realtimeRouter);
app.use('/v1', alertsRouter);

app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

const port = process.env.PORT || 3002;
app.listen(port, () => {
  // Implements FR-007 (departures) and FR-009 (nearby stops) (TRGO-18)
  console.log(`Real-Time service listening on :${port}`);
});

app.use(errorHandler);
export default app;
