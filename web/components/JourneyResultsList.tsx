import React from 'react';
import { JourneyOption } from '../lib/api';

type Props = { options: JourneyOption[] };

export function JourneyResultsList({ options }: Props) {
  if (!options.length) return <p data-testid="empty">No results</p>;
  return (
    <ul data-testid="journeys">
      {options.map((o) => (
        <li key={o.summary}>{o.summary} — {o.durationMinutes} min</li>
      ))}
    </ul>
  );
}
