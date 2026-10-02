type SavedJourney = { id: string; origin: string; destination: string; createdAt: string };
type Favourite = { id: string; type: 'stop' | 'line'; value: string; createdAt: string };

const saved: SavedJourney[] = [];
const favs: Favourite[] = [];

export const journeysRepo = {
  save(origin: string, destination: string) {
    const j: SavedJourney = { id: String(saved.length + 1), origin, destination, createdAt: new Date().toISOString() };
    saved.push(j);
    return j;
  },
  list(): SavedJourney[] {
    return saved.slice().reverse();
  }
};

export const favouritesRepo = {
  add(type: 'stop' | 'line', value: string) {
    const f: Favourite = { id: String(favs.length + 1), type, value, createdAt: new Date().toISOString() };
    favs.push(f);
    return f;
  },
  list(): Favourite[] {
    return favs.slice().reverse();
  }
};
