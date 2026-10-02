import Head from 'next/head';
import { useState } from 'react';
import { searchJourneys, JourneyOption } from '../lib/api';
import '../styles/tokens.css';

export default function Planner() {
  const [origin, setOrigin] = useState('Main Station');
  const [destination, setDestination] = useState('Tech District');
  const [options, setOptions] = useState<JourneyOption[]>([]);

  return (
    <>
      <Head><title>Planner • TransitGo</title></Head>
      <main style={{ padding: 'var(--space-6)' }}>
        <h1>Journey Planner</h1>
        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
          <input aria-label="Origin" value={origin} onChange={e => setOrigin(e.target.value)} />
          <input aria-label="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
          <button
            style={{ background: 'var(--color-primary)', color: 'white', padding: 'var(--space-3) var(--space-4)' }}
            onClick={async () => setOptions(await searchJourneys(origin, destination))}
          >Search</button>
        </div>
        <ul>
          {options.map(o => <li key={o.summary}>{o.summary} — {o.durationMinutes} min</li>)}
        </ul>
      </main>
    </>
  );
}
