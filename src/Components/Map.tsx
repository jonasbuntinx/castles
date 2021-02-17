import * as MapboxGL from "mapbox-gl";
import * as React from "react";

function Map(): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const [mapInstance, setMapInstance] = React.useState<MapboxGL.Map | null>(null);

  React.useEffect(() => {
    if (mapInstance || !ref.current) {
      return;
    }

    const map = new MapboxGL.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [139.68, 35.68],
      zoom: 9,
    });

    setMapInstance(map);
  }, [mapInstance, setMapInstance, ref]);

  return <div ref={ref} style={{ width: "640px", height: "480px" }} />;
}

export { Map };
