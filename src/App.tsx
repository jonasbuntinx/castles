import * as React from "react";
import { Map } from "~/Components/Map";
import { ControlledModal, Summary } from "~/Components/Castle";
import { Castle, castles, Condition, printCondition } from "~/Data/Castle";
import dayjs = require("dayjs");
import { List } from "~/Components/List";
import {
  faFastBackward,
  faFastForward,
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp,
} from "@fortawesome/free-solid-svg-icons";

type State = {
  selected: Castle | null;
  zoom: number;
};

function App(): JSX.Element {
  const [state, setState] = React.useState<State>({
    selected: castles[0],
    zoom: 12.0,
  });

  const sorters = [
    {
      id: "Alphanumeric Asc",
      compareFn: (a: Castle, b: Castle) => a.name.localeCompare(b.name),
      icon: faSortAlphaDown,
    },
    {
      id: "Alphanumeric Desc",
      compareFn: (a: Castle, b: Castle) => b.name.localeCompare(a.name),
      icon: faSortAlphaUp,
    },
    {
      id: "Datetime Desc",
      compareFn: (a: Castle, b: Castle) => (dayjs(a.visited).isBefore(dayjs(b.visited)) ? 1 : -1),
      icon: faFastBackward,
    },
    {
      id: "Datetime Asc",
      compareFn: (a: Castle, b: Castle) => (dayjs(a.visited).isAfter(dayjs(b.visited)) ? 1 : -1),
      icon: faFastForward,
    },
  ];

  const filters = [
    {
      id: "Condition",
      values: [null, Condition.Ruins, Condition.Reconstructed, Condition.Original],
      toLabel: (condition: Condition) => (condition ? printCondition(condition) : "All"),
      filterFn: (value: Condition) => (item: Castle) => (value ? item.condition == value : true),
      icon: faFilter,
    },
  ];

  return (
    <div className="h-screen flex">
      <List
        data={castles}
        sorters={sorters}
        filters={filters}
        renderItem={castle => (
          <Summary
            castle={castle}
            isActive={state.selected ? castle.id == state.selected.id : false}
            onClick={() => setState(state => ({ ...state, selected: castle }))}
          />
        )}
        render={(list, controls, next, previous) => (
          <>
            <div className="w-80 flex flex-col">
              <h1 className="bg-green-900 text-white flex items-center justify-center p-4 text-xl">
                Castles are cool!
              </h1>
              {controls}
              <div className="flex-1 p-5 overflow-auto bg-gray-200">
                <ul className="flex flex-col gap-2">{list}</ul>
              </div>
            </div>
            <div className="flex-1">
              <Map
                center={state.selected?.location}
                zoom={state.zoom}
                popupContent={close => {
                  return state.selected ? (
                    <ControlledModal
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
  );
}

export { App };
