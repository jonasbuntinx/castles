import * as MapboxGL from "mapbox-gl";
import * as React from "react";

type Props = {
  center: MapboxGL.LngLat;
  zoom: number;
};

function Map(props: Props): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const [mapInstance, setMapInstance] = React.useState<MapboxGL.Map | null>(null);

  React.useEffect(() => {
    if (mapInstance || !ref.current) {
      return;
    }

    const map = new MapboxGL.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: props.center,
      zoom: props.zoom,
    });

    setMapInstance(map);
  }, [mapInstance, setMapInstance, ref, props.center, props.zoom]);

  React.useEffect(() => {
    if (!mapInstance) {
      return;
    }

    mapInstance.flyTo({ center: props.center, zoom: props.zoom });
  }, [mapInstance, props.center, props.zoom]);

  return <div ref={ref} className="w-full h-full" />;
}

export { Map };
