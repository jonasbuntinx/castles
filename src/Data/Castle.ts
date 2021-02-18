import * as MapboxGL from "mapbox-gl";

// Types
type Castle = {
  id: number;
  name: string;
  location: MapboxGL.LngLat;
  visited?: Date;
  condition: Condition;
};

enum Condition {
  Ruins = "RUINS",
  Reconstructed = "RECONSTRUCTED",
  Original = "ORIGINAL",
}

// Data
const castles = [
  { id: 0, name: "Edo Castle", location: new MapboxGL.LngLat(139.752496, 35.6877513), condition: Condition.Ruins },
  {
    id: 1,
    name: "Matsumoto Castle",
    location: new MapboxGL.LngLat(137.9666734, 36.2386573),
    condition: Condition.Original,
  },
  {
    id: 2,
    name: "Osaka Castle",
    location: new MapboxGL.LngLat(135.5237615, 34.6873377),
    condition: Condition.Reconstructed,
  },
];

export { Castle, Condition, castles };
