import express from 'express';
import { requestIdMiddleware } from '@transitgo/common/src/requestId';
import { errorHandler } from '@transitgo/common/src/errors';
import { ticketsRouter } from './routes/tickets';

const app = express();
app.use(express.json());
app.use(requestIdMiddleware);
app.use('/v1', ticketsRouter);
app.get('/healthz', (_req, res) => res.json({ status: 'ok' }));
app.get('/readyz', (_req, res) => res.json({ status: 'ready' }));

const port = process.env.PORT || 3005;
app.listen(port, () => {
  // Implements FR-013..FR-015
  console.log(`Ticketing service listening on :${port}`);
});

app.use(errorHandler);
export default app;
