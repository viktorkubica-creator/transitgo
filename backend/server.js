// Legacy Node/Express server with outdated paths and shared API key
// TODO: should be fast; TBD: timeouts?
const express = require('express');
const app = express();
app.use(express.json());

const API_KEY = process.env.API_KEY || 'SHARED-LEGACY-KEY-123';
app.use((req, res, next) => {
  if ((req.headers['x-api-key'] || '') !== API_KEY) {
    return res.status(401).json({ error: 'invalid api key' });
  }
  next();
});

// /api/v1/payments (legacy)
app.post('/api/v1/payments', (req, res) => {
  res.json({ ok: true, path: '/api/v1/payments', provider: 'DanuPay' });
});

// /payments/v2 (legacy)
app.get('/payments/v2/status', (req, res) => {
  res.json({ status: 'ok', path: '/payments/v2/status' });
});

// /platform/payment/v2 (legacy)
app.post('/platform/payment/v2/intents', (req, res) => {
  res.json({ id: 'intent_legacy', path: '/platform/payment/v2/intents' });
});

// /api/v0/legacy (very old)
app.get('/api/v0/legacy', (req, res) => {
  res.json({ legacy: true });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Legacy backend listening on :${port}`);
});
