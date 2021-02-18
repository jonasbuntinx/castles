import * as MapboxGL from "mapbox-gl";
import * as React from "react";

type Props = {
  center?: MapboxGL.LngLat;
  zoom: number;
  onFlyTo: () => void;
  onMove: (point: { x: number; y: number }) => void;
};

function Map({ center, zoom, onMove, onFlyTo }: Props): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const [mapInstance, setMapInstance] = React.useState<MapboxGL.Map | null>(null);

  const [markerInstance] = React.useState<MapboxGL.Marker>(new MapboxGL.Marker());

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const map = new MapboxGL.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center,
      zoom,
    });

    setMapInstance(map);

    if (center) {
      markerInstance.setLngLat(center).addTo(map);
    }

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!ref.current || !mapInstance || !center) {
      return;
    }

    mapInstance.on("move", () => {
      let { x, y } = mapInstance.project(center);
      if (ref.current) {
        x = x + ref.current.offsetLeft;
        y = y + ref.current.offsetTop;
      }
      onMove({ x, y });
    });
  }, [mapInstance, center, onMove, onFlyTo]);

  React.useEffect(() => {
    if (!mapInstance || !center) {
      return;
    }

    mapInstance.flyTo({ center: center });

    markerInstance.setLngLat(center);

    mapInstance.once("moveend", () => {
      if (mapInstance.getCenter().distanceTo(center) < 100.0) {
        onFlyTo();
      }
    });
  }, [mapInstance, markerInstance, center, onFlyTo]);

  return <div ref={ref} className="w-full h-full" />;
}

export { Map };
