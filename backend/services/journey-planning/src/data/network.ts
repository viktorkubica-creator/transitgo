import { Line, Stop } from '../domain/models';

// Danubia City sample network (fictional)
export const stops: Stop[] = [
  { id: 'STP-A', name: 'Main Station', lat: 48.145, lon: 17.107, accessible: true },
  { id: 'STP-B', name: 'Old Town', lat: 48.147, lon: 17.106, accessible: true },
  { id: 'STP-C', name: 'Riverside Park', lat: 48.151, lon: 17.112, accessible: false },
  { id: 'STP-D', name: 'Tech District', lat: 48.160, lon: 17.125, accessible: true },
  { id: 'STP-E', name: 'University', lat: 48.156, lon: 17.115, accessible: true }
];

export const lines: Line[] = [
  { id: 'L-1', mode: 'TRAM', name: 'Tram 1', accessible: true },
  { id: 'L-4', mode: 'BUS', name: 'Bus 4', accessible: true },
  { id: 'L-7', mode: 'TROLLEYBUS', name: 'Trolley 7', accessible: false }
];

export function findStopByNameOrId(q: string) {
  const needle = q.trim().toLowerCase();
  return stops.find(
    (s) => s.id.toLowerCase() === needle || s.name.toLowerCase() === needle
  );
}

export function autocompletePlaces(q: string, limit = 5) {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return stops
    .filter((s) => s.id.toLowerCase().includes(needle) || s.name.toLowerCase().includes(needle))
    .slice(0, limit);
}

export function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
