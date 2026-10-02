import express from 'express';
import { journeysRouter } from './routes/journeys';
import { savedRouter } from './routes/journeysSaved';
import { requestIdMiddleware } from '@transitgo/common/src/requestId';
import { errorHandler } from '@transitgo/common/src/errors';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', journeysRouter);
app.use('/v1', savedRouter);

app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  // Implements FR-001..FR-003 (TRGO-20)
  console.log(`Journey Planning service listening on :${port}`);
});

app.use(errorHandler);
export default app;
