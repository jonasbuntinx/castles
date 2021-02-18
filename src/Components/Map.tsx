import * as MapboxGL from "mapbox-gl";
import * as React from "react";

type Props = {
  center?: MapboxGL.LngLat;
  zoom: number;
  popupContent: (close: () => void) => React.ReactNode;
};

type PopupState = {
  isOpen: boolean;
  point: { x: number; y: number };
  content: React.ReactNode | null;
};

type PopupActions =
  | { tag: "Open" }
  | { tag: "Close" }
  | { tag: "SetContent"; content: React.ReactNode | null }
  | { tag: "SetPoint"; point: { x: number; y: number } };

function Map({ center, zoom, popupContent }: Props): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);

  const [mapInstance, setMapInstance] = React.useState<MapboxGL.Map | null>(null);

  const [markerInstance] = React.useState<MapboxGL.Marker>(new MapboxGL.Marker());

  const reducer: React.Reducer<PopupState, PopupActions> = (state: PopupState, action: PopupActions) => {
    switch (action.tag) {
      case "Open":
        return { ...state, isOpen: true };
      case "Close":
        return { ...state, isOpen: false };
      case "SetContent":
        return { ...state, content: action.content, isOpen: action.content ? true : false };
      case "SetPoint":
        return { ...state, point: action.point };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = React.useReducer(reducer, { isOpen: false, content: null, point: { x: 0, y: 0 } });

  const close = React.useCallback(() => dispatch({ tag: "Close" }), []);

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
      markerInstance.getElement().addEventListener("click", () => {
        dispatch({ tag: "Open" });
      });
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
      dispatch({ tag: "SetPoint", point: { x, y } });
    });
  }, [mapInstance, center]);

  React.useEffect(() => {
    if (!mapInstance || !center) {
      return;
    }

    dispatch({ tag: "SetContent", content: null });

    mapInstance.flyTo({ center, zoom });

    markerInstance.setLngLat(center);

    mapInstance.once("moveend", () => {
      if (mapInstance.getCenter().distanceTo(center) < 100.0) {
        dispatch({ tag: "SetContent", content: popupContent(() => close()) });
      }
    });
  }, [mapInstance, markerInstance, center, zoom, popupContent, close]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={ref} className="w-full h-full" />
      {state.isOpen && state.content ? (
        <div className="absolute" style={{ width: "300px", height: "350px", top: state.point.y, left: state.point.x }}>
          {state.content}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export { Map };
