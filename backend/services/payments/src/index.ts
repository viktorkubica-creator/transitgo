import express from 'express';
import { paymentsRouter } from './routes/payments';

const app = express();
app.use(express.json());
app.use('/v1', paymentsRouter);

const port = process.env.PORT || 3004;
app.listen(port, () => {
  // Implements FR-022..FR-024 (TRGO-16)
  console.log(`Payments service listening on :${port}`);
});

export default app;
