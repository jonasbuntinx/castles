import * as React from "react";
import { Map } from "~/Components/Map";
import { Popup } from "~Components/Popup";
import { Navigation } from "~Components/Navigation";
import { Header, Summary } from "~Components/Castle";
import { Castle, castles } from "~Data/Castle";

type State = {
  selected: Castle | null;
  zoom: number;
};

type Actions = { tag: "SelectCastle"; selected: Castle } | { tag: "Reset" };

function Home(): JSX.Element {
  const data = React.useMemo(() => castles, []);

  const initialState = {
    selected: data[0],
    zoom: 12.0,
  };

  const reducer: React.Reducer<State, Actions> = (state: State, action: Actions) => {
    switch (action.tag) {
      case "SelectCastle":
        return { ...state, selected: action.selected };
      case "Reset":
        return { ...initialState };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/4">
          <div className="flex flex-col">
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
        </div>
        <div className="flex-1">
          <Map
            center={state.selected?.location}
            zoom={state.zoom}
            popupContent={close =>
              state.selected ? (
                <Popup
                  onClose={() => close()}
                  header={<Header castle={state.selected} />}
                  footer={<Navigation onBack={() => null} onForward={() => null} />}
                >
                  <Summary castle={state.selected} />
                </Popup>
              ) : (
                <></>
              )
            }
          />
        </div>
      </div>
    </>
  );
}

export { Home };
