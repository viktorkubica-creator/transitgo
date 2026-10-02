type PlanParams = {
  origin: string;
  destination: string;
  time?: Date;
  arriveBy?: boolean;
};

// Mock OpenTripPlanner adapter for training
export async function planJourney(params: PlanParams) {
  const now = params.time ?? new Date();
  const start = now.toISOString();
  const end = new Date(now.getTime() + 25 * 60 * 1000).toISOString();

  return [
    {
      summary: `${params.origin} → ${params.destination} (fastest)`,
      durationMinutes: 25,
      legs: [
        { mode: 'WALK', from: params.origin, to: 'Stop A', startTime: start, endTime: start },
        { mode: 'TRAM', from: 'Stop A', to: 'Stop B', startTime: start, endTime: end }
      ]
    }
  ];
}
