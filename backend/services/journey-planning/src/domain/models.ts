export type Stop = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  accessible?: boolean;
};

export type Line = {
  id: string;
  mode: 'BUS' | 'TRAM' | 'TROLLEYBUS';
  name: string;
  accessible?: boolean;
};

export type Leg = {
  mode: 'WALK' | 'BUS' | 'TRAM' | 'TROLLEYBUS';
  from: string;
  to: string;
  startTime: string; // ISO
  endTime: string; // ISO
  lineId?: string;
  distanceMeters?: number;
};

export type JourneyOption = {
  summary: string;
  durationMinutes: number;
  legs: Leg[];
  accessible?: boolean;
};

export type JourneySearchRequest = {
  origin: string;
  destination: string;
  time?: Date;
  arriveBy?: boolean;
  accessibility?: 'step_free' | 'any';
  maxWalkMeters?: number;
};

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};
