import Head from 'next/head';
import '../styles/tokens.css';

export default function CorporatePass() {
  return (
    <>
      <Head><title>Corporate Pass • TransitGo</title></Head>
      <main style={{ padding: 'var(--space-6)' }}>
        <h1>Corporate Pass Overview</h1>
        <p>Employers can allocate monthly passes to employee accounts.</p>
        <ul>
          <li>Billing monthly (UBL 2.1), SEPA payments</li>
          <li>Eligibility: employer-managed</li>
          <li>No validation on web portal (mobile wallet only)</li>
        </ul>
      </main>
    </>
  );
}
