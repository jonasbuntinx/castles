import * as MapboxGL from "mapbox-gl";

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

export { Castle, Condition };
