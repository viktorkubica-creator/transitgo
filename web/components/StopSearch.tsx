import React, { useState } from 'react';

type Props = { onSearch: (origin: string, destination: string) => void };

export function StopSearch({ onSearch }: Props) {
  const [origin, setOrigin] = useState('Main Station');
  const [destination, setDestination] = useState('Tech District');
  return (
    <div>
      <input aria-label="Origin" value={origin} onChange={e => setOrigin(e.target.value)} />
      <input aria-label="Destination" value={destination} onChange={e => setDestination(e.target.value)} />
      <button onClick={() => onSearch(origin, destination)}>Search</button>
    </div>
  );
}
