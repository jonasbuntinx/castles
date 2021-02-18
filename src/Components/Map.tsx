import * as MapboxGL from "mapbox-gl";
import * as React from "react";

type Props = {
  center?: MapboxGL.LngLat;
  zoom: number;
  popupContent: (close: () => void) => React.ReactNode;
};

function Map({ center, zoom, popupContent }: Props): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const [mapInstance, setMapInstance] = React.useState<MapboxGL.Map | null>(null);

  const [markerInstance] = React.useState<MapboxGL.Marker>(new MapboxGL.Marker());

  const [popup, setPopup] = React.useState<React.ReactNode>(null);

  const [position, setPosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });

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
        x = x + ref.current.offsetLeft + 50;
        y = y + ref.current.offsetTop - 175;
      }
      setPosition({ x, y });
    });
  }, [mapInstance, center]);

  React.useEffect(() => {
    if (!mapInstance || !center) {
      return;
    }

    setPopup(null);

    mapInstance.flyTo({ center, zoom });

    markerInstance.setLngLat(center);

    mapInstance.once("moveend", () => {
      if (mapInstance.getCenter().distanceTo(center) < 100.0) {
        setPopup(popupContent(() => setPopup(null)));
      }
    });
  }, [mapInstance, markerInstance, center, zoom, popupContent]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={ref} className="w-full h-full" />
      {popup ? (
        <div className="absolute" style={{ width: "300px", height: "350px", top: position.y, left: position.x }}>
          {popup}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export { Map };
