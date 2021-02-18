import * as React from "react";
import * as MapboxGL from "mapbox-gl";
import { Map } from "~/Components/Map";
import { Popup } from "~Components/Popup";
import { Navigation } from "~Components/Navigation";
import { CastleSummary } from "~Components/CastleSummary";
import { Castle, Condition } from "~Data/Castle";

type State = {
  selected: Castle | null;
  zoom: number;
  point: { x: number; y: number } | null;
  isOpen: boolean;
};

type Actions =
  | { tag: "SelectCastle"; selected: Castle }
  | { tag: "UpdatePoint"; point: { x: number; y: number } }
  | { tag: "OpenPopup" }
  | { tag: "ClosePopup" }
  | { tag: "Reset" };

function Home(): JSX.Element {
  const data = [
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

  const initialState = {
    selected: data[0],
    zoom: 12.0,
    point: null,
    isOpen: true,
  };

  const reducer: React.Reducer<State, Actions> = (state: State, action: Actions) => {
    switch (action.tag) {
      case "SelectCastle":
        return { ...state, selected: action.selected, isOpen: false };
      case "UpdatePoint":
        return { ...state, point: action.point };
      case "OpenPopup":
        return { ...state, isOpen: true };
      case "ClosePopup":
        return { ...state, isOpen: false };
      case "Reset":
        return { ...initialState, isOpen: false };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onFlyToCallback = React.useCallback(() => {
    dispatch({ tag: "OpenPopup" });
  }, [dispatch]);

  const onMoveCallback = React.useCallback(
    point => {
      dispatch({ tag: "UpdatePoint", point });
    },
    [dispatch]
  );

  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/4 flex flex-col">
          {data.map((castle, key) => (
            <button
              key={key}
              onClick={() => {
                dispatch({ tag: "SelectCastle", selected: castle });
              }}
            >
              {castle.name}
            </button>
          ))}
          <button
            onClick={() => {
              dispatch({ tag: "Reset" });
            }}
          >
            Reset
          </button>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <Map center={state.selected?.location} zoom={state.zoom} onFlyTo={onFlyToCallback} onMove={onMoveCallback} />
          {state.selected ? (
            <Popup
              title={state.selected.name}
              isOpen={state.isOpen}
              position={state.point ? { x: state.point.x, y: state.point.y } : { x: 0, y: 0 }}
              onClose={() => dispatch({ tag: "ClosePopup" })}
              footer={<Navigation onBack={() => null} onForward={() => null} />}
            >
              <CastleSummary castle={state.selected} />
            </Popup>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export { Home };
