import { JourneyOption, JourneySearchRequest, Leg } from '../domain/models';
import { findStopByNameOrId, haversineMeters, lines, stops } from '../data/network';

// Simple mocked router that stitches WALK + one transit leg
export function routeJourneys(req: JourneySearchRequest): JourneyOption[] {
  const origin = findStopByNameOrId(req.origin);
  const destination = findStopByNameOrId(req.destination);
  if (!origin || !destination) {
    throw createError('INVALID_LOCATION', 'Origin or destination not found', { origin: req.origin, destination: req.destination });
  }
  if (origin.id === destination.id) {
    throw createError('SAME_LOCATION', 'Origin and destination must differ', { stopId: origin.id });
  }
  const time = req.time ?? new Date();
  const arriveBy = !!req.arriveBy;
  const maxWalk = req.maxWalkMeters ?? 1000;
  const requireAccessible = req.accessibility === 'step_free';

  // Walk distance from origin to nearest boarding stop (mocked as origin itself)
  const walkToBoardMeters = 200;
  if (walkToBoardMeters > maxWalk) {
    throw createError('WALK_TOO_FAR', 'Required walking distance exceeds maximum', { required: walkToBoardMeters, max: maxWalk });
  }

  // Pick a line that "connects" origin to destination (mocked by proximity)
  const candidateLine = pickBestLine(requireAccessible);
  if (!candidateLine) {
    throw createError('NO_SERVICE', 'No suitable service available', { requireAccessible });
  }

  // Build legs and compute times
  const startTime = new Date(time);
  const transitDurationMin = estimateTransitMinutes(origin, destination);
  const walkDurationMin = Math.round(walkToBoardMeters / 1.4 / 60); // ~1.4 m/s
  const totalMin = walkDurationMin + transitDurationMin + 2; // transfers/padding

  let departAt = startTime;
  let arriveAt = new Date(startTime.getTime() + totalMin * 60000);
  if (arriveBy) {
    arriveAt = startTime;
    departAt = new Date(arriveAt.getTime() - totalMin * 60000);
  }

  const legs: Leg[] = [
    {
      mode: 'WALK',
      from: 'Origin (user location)',
      to: origin.name,
      startTime: departAt.toISOString(),
      endTime: new Date(departAt.getTime() + walkDurationMin * 60000).toISOString(),
      distanceMeters: walkToBoardMeters
    },
    {
      mode: candidateLine.mode,
      from: origin.name,
      to: destination.name,
      startTime: new Date(departAt.getTime() + walkDurationMin * 60000).toISOString(),
      endTime: new Date(departAt.getTime() + (walkDurationMin + transitDurationMin) * 60000).toISOString(),
      lineId: candidateLine.id
    }
  ];

  const option: JourneyOption = {
    summary: `${origin.name} → ${destination.name} via ${candidateLine.name}`,
    durationMinutes: totalMin,
    legs,
    accessible: requireAccessible ? true : undefined
  };
  return [option];
}

export function createError(code: string, message: string, details?: unknown) {
  const e = new Error(message) as Error & { code: string; details?: unknown };
  (e as any).code = code;
  (e as any).details = details;
  return e;
}

function pickBestLine(requireAccessible: boolean) {
  const pool = requireAccessible ? lines.filter((l) => l.accessible) : lines;
  // naive ranking: prefer TRAM > BUS > TROLLEYBUS
  const rank = (m: string) => (m === 'TRAM' ? 3 : m === 'BUS' ? 2 : 1);
  return pool.sort((a, b) => rank(b.mode) - rank(a.mode))[0];
}

function estimateTransitMinutes(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const meters = haversineMeters(a.lat, a.lon, b.lat, b.lon);
  // 18 km/h average including stops
  return Math.max(5, Math.round((meters / 1000 / 18) * 60));
}
