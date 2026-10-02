import express from 'express';
import { journeysRouter } from './routes/journeys';

const app = express();
app.use(express.json());
app.use('/v1', journeysRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  // Implements FR-001..FR-003 (TRGO-20)
  console.log(`Journey Planning service listening on :${port}`);
});

export default app;
