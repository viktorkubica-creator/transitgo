import express from 'express';
import { journeysRouter } from './routes/journeys';
import { savedRouter } from './routes/journeysSaved';
import { requestIdMiddleware, errorHandler } from '@transitgo/common';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', journeysRouter);
app.use('/v1', savedRouter);

app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // Implements FR-001..FR-003 (TRGO-20)
    console.log(`Journey Planning service listening on :${port}`);
  });
}

app.use(errorHandler);
export default app;
