import mapboxgl from "mapbox-gl";
import { main } from "./Main";
import { MAPBOX_ACCESS_TOKEN } from "./Env";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

main();
