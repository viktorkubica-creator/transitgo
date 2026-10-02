import Head from 'next/head';
import { useState } from 'react';
import { searchJourneys, JourneyOption } from '../lib/api';
import Layout from '../components/Layout';
import { StopSearch } from '../components/StopSearch';
import { JourneyResultsList } from '../components/JourneyResultsList';

export default function Planner() {
  const [origin, setOrigin] = useState('Main Station');
  const [destination, setDestination] = useState('Tech District');
  const [options, setOptions] = useState<JourneyOption[]>([]);

  return (
    <Layout>
      <Head><title>Planner • TransitGo</title></Head>
      <h1>Journey Planner</h1>
      <StopSearch onSearch={async (o, d) => setOptions(await searchJourneys(o, d))} />
      <JourneyResultsList options={options} />
    </Layout>
  );
}
