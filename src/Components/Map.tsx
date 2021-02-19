import * as MapboxGL from "mapbox-gl";
import * as React from "react";

type Props = {
  center?: MapboxGL.LngLat;
  zoom: number;
  popupContent: (close: () => void) => React.ReactNode;
};

type PopupState = {
  isOpen: boolean;
  point: { x: number; y: number } | null;
  content: React.ReactNode | null;
};

const calculatePoint = (ref: React.RefObject<HTMLDivElement>, map: MapboxGL.Map, lgnLat: MapboxGL.LngLat) => {
  let { x, y } = map.project(lgnLat);
  if (ref.current) {
    x = x + ref.current.offsetLeft + 50;
    y = y + ref.current.offsetTop - 175;
  }
  return { x, y };
};

function Map({ center, zoom, popupContent }: Props): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const [currentCenter, setCurrentCenter] = React.useState<MapboxGL.LngLat | null>(center || null);

  const [mapInstance, setMapInstance] = React.useState<MapboxGL.Map | null>(null);

  const [markerInstance] = React.useState<MapboxGL.Marker>(new MapboxGL.Marker());

  const [popupState, setPopupState] = React.useState<PopupState>({ isOpen: true, content: null, point: null });

  const close = React.useCallback(() => setPopupState(state => ({ ...state, isOpen: false })), []);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    const map = new MapboxGL.Map({
      container: ref.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center ? center : new MapboxGL.LngLat(139, 35),
      zoom: center ? zoom : 5.0,
    });

    setMapInstance(map);
    markerInstance.getElement().addEventListener("click", () => {
      setPopupState(state => ({ ...state, isOpen: true }));
    });

    if (center) {
      markerInstance.setLngLat(center).addTo(map);

      const point = calculatePoint(ref, map, center);
      setPopupState(state => ({ ...state, point: point, content: popupContent(() => close()) }));
    }

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setCurrentCenter(center || null);

    if (!ref.current || !mapInstance || !center) {
      return;
    }

    mapInstance.on("move", () => {
      const point = calculatePoint(ref, mapInstance, center);
      setPopupState(state => ({ ...state, point: point }));
    });
  }, [mapInstance, center]);

  React.useEffect(() => {
    if (!mapInstance) {
      return;
    }

    if (!center) {
      setPopupState(state => ({ ...state, isOpen: false, content: null }));
      markerInstance.remove();
    } else if (!currentCenter || (currentCenter.lng != center.lng && currentCenter.lat != center.lat)) {
      setPopupState(state => ({ ...state, isOpen: false }));

      mapInstance.flyTo({ center, zoom });

      markerInstance.setLngLat(center).addTo(mapInstance);

      mapInstance.once("moveend", () => {
        if (mapInstance.getCenter().distanceTo(center) < 100.0) {
          setPopupState(state => ({ ...state, isOpen: true, content: popupContent(() => close()) }));
        }
      });
    }
  }, [mapInstance, markerInstance, currentCenter, center, zoom, popupContent, close]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={ref} className="w-full h-full" />
      {popupState.isOpen && popupState.content && popupState.point ? (
        <div
          className="absolute"
          style={{ width: "300px", height: "350px", top: popupState.point.y, left: popupState.point.x }}
        >
          {popupState.content}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export { Map };
