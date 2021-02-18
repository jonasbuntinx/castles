import * as React from "react";
import * as MapboxGL from "mapbox-gl";
import { Map } from "~/Components/Map";

type State = {
  center: MapboxGL.LngLat;
  zoom: number;
};

type Actions = { tag: "UpdateCenter"; center: MapboxGL.LngLat } | { tag: "Reset" };

function Home(): JSX.Element {
  const data = [
    { name: "Edo Castle", location: new MapboxGL.LngLat(139.752496, 35.6877513) },
    { name: "Matsumoto Castle", location: new MapboxGL.LngLat(137.9666734, 36.2386573) },
    { name: "Osaka Castle", location: new MapboxGL.LngLat(135.5237615, 34.6873377) },
  ];

  const initialState = { center: data[0] ? data[0].location : new MapboxGL.LngLat(0.0, 0.0), zoom: 12.0 };

  const reducer: React.Reducer<State, Actions> = (state: State, action: Actions) => {
    switch (action.tag) {
      case "UpdateCenter":
        return { ...state, center: action.center };
      case "Reset":
        return { ...initialState, center: Object.assign({}, initialState.center) };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <div className="h-screen flex">
      <div className="w-1/4 flex flex-col">
        {data.map(({ name, location }, key) => (
          <button
            key={key}
            onClick={() => {
              dispatch({ tag: "UpdateCenter", center: location });
            }}
          >
            {name}
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
      <div className="flex-1">
        <Map center={state.center} zoom={state.zoom} />
      </div>
    </div>
  );
}

export { Home };
