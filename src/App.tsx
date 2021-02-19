import * as React from "react";
import { Map } from "~/Components/Map";
import { Popup } from "~/Components/Castle";
import { Castle, castles, Condition } from "~/Data/Castle";
import dayjs = require("dayjs");
import { List } from "~Components/List";

type State = {
  selected: Castle | null;
  zoom: number;
  sortingRule: SortingRule | null;
};

type SortingRule = { type: SortType; desc?: boolean };

enum SortType {
  Alphanumeric = "alphanumeric",
  Datetime = "datetime",
}

function App(): JSX.Element {
  const [state, setState] = React.useState<State>({
    selected: castles[0],
    zoom: 12.0,
    sortingRule: null,
  });

  return (
    <>
      <div className="h-screen flex">
        <List
          data={castles}
          renderItem={castle => (
            <button
              className={state.selected && castle.id == state.selected.id ? "bg-green-900 text-white" : ""}
              onClick={() => setState(state => ({ ...state, selected: castle }))}
            >
              {castle.name} {dayjs(castle.visited).format("DD/MM/YYYY")}
            </button>
          )}
          render={(list, sort, filter, next, previous, reset) => (
            <>
              <div className="w-80">
                <div className="flex flex-col">
                  {list}
                  <button
                    className={
                      state.sortingRule?.type == SortType.Alphanumeric && Boolean(state.sortingRule?.desc) == true
                        ? "bg-green-900 text-white"
                        : "bg-white"
                    }
                    onClick={() => {
                      setState(state => ({ ...state, sortingRule: { type: SortType.Alphanumeric, desc: true } }));
                      sort((a: Castle, b: Castle) => b.name.localeCompare(a.name));
                    }}
                  >
                    Sort Alphanumeric Desc
                  </button>
                  <button
                    className={
                      state.sortingRule?.type == SortType.Alphanumeric && Boolean(state.sortingRule?.desc) == false
                        ? "bg-green-900 text-white"
                        : "bg-white"
                    }
                    onClick={() => {
                      setState(state => ({ ...state, sortingRule: { type: SortType.Alphanumeric } }));
                      sort((a: Castle, b: Castle) => a.name.localeCompare(b.name));
                    }}
                  >
                    Sort Alphanumeric Asc
                  </button>
                  <button
                    className={
                      state.sortingRule?.type == SortType.Datetime && Boolean(state.sortingRule?.desc) == true
                        ? "bg-green-900 text-white"
                        : "bg-white"
                    }
                    onClick={() => {
                      setState(state => ({ ...state, sortingRule: { type: SortType.Datetime, desc: true } }));
                      sort((a: Castle, b: Castle) => (dayjs(a.visited).isBefore(dayjs(b.visited)) ? 1 : -1));
                    }}
                  >
                    Sort Datetime Desc
                  </button>
                  <button
                    className={
                      state.sortingRule?.type == SortType.Datetime && Boolean(state.sortingRule?.desc) == false
                        ? "bg-green-900 text-white"
                        : "bg-white"
                    }
                    onClick={() => {
                      setState(state => ({ ...state, sortingRule: { type: SortType.Datetime } }));
                      sort((a: Castle, b: Castle) => (dayjs(a.visited).isAfter(dayjs(b.visited)) ? 1 : -1));
                    }}
                  >
                    Sort Datetime Asc
                  </button>
                  <button onClick={() => filter(({ condition }) => condition != Condition.Original)}>Filter</button>
                  <button onClick={() => filter(null)}>UnFilter</button>
                  <button
                    onClick={() => {
                      reset();
                      setState(state => ({ ...state, sortingRule: null }));
                    }}
                  >
                    Reset
                  </button>
                  <button onClick={() => setState(state => ({ ...state, selected: next(state.selected) }))}>
                    Next
                  </button>
                  <button onClick={() => setState(state => ({ ...state, selected: previous(state.selected) }))}>
                    Prev
                  </button>
                </div>
              </div>
              <div className="flex-1">
                <Map
                  center={state.selected?.location}
                  zoom={state.zoom}
                  popupContent={close => {
                    return state.selected ? (
                      <Popup
                        castle={state.selected}
                        className="h-full"
                        onClose={() => close()}
                        onPrevious={() => setState(state => ({ ...state, selected: previous(state.selected) }))}
                        onNext={() => setState(state => ({ ...state, selected: next(state.selected) }))}
                      />
                    ) : (
                      <></>
                    );
                  }}
                />
              </div>
            </>
          )}
        />
      </div>
    </>
  );
}

export { App };
