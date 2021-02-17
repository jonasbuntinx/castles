import mapboxgl from "mapbox-gl";
import { app } from "./App";
import { MAPBOX_ACCESS_TOKEN } from "./Env";

mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

app();
