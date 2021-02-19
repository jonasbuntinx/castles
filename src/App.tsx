import * as React from "react";
import { Map } from "~/Components/Map";
import { Popup } from "~/Components/Castle";
import { Castle, castles } from "~/Data/Castle";

type State = {
  selected: Castle | null;
  zoom: number;
};

type Actions =
  | { tag: "SelectCastle"; selected: Castle }
  | { tag: "Sort" }
  | { tag: "Next" }
  | { tag: "Previous" }
  | { tag: "Reset" };

function App(): JSX.Element {
  const data = React.useMemo(() => castles, []);

  const initialState = {
    selected: data[0],
    zoom: 12.0,
  };

  const reducer: React.Reducer<State, Actions> = (state: State, action: Actions) => {
    switch (action.tag) {
      case "SelectCastle":
        return { ...state, selected: action.selected };
      case "Sort":
        return state;
      case "Next": {
        const currentIndex = data.findIndex(item => (state.selected ? item.id == state.selected.id : false));
        const nextIndex = (currentIndex + 1) % data.length;
        return { ...state, selected: data[nextIndex] };
      }
      case "Previous": {
        const currentIndex = data.findIndex(item => (state.selected ? item.id == state.selected.id : false));
        const nextIndex = (currentIndex + data.length - 1) % data.length;
        return { ...state, selected: data[nextIndex] };
      }
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
        <div className="w-80">
          <div className="flex flex-col">
            {data.map((castle, key) => (
              <button
                key={key}
                className={state.selected && castle.id == state.selected.id ? "bg-green-900 text-white" : ""}
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
                  castle={state.selected}
                  onClose={() => close()}
                  onPrevious={() => dispatch({ tag: "Previous" })}
                  onNext={() => dispatch({ tag: "Next" })}
                />
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

export { App };
