import * as React from "react";
import { Map } from "~/Components/Map";
import { Popup, Summary } from "~/Components/Castle";
import { Castle, castles, Condition } from "~/Data/Castle";
import dayjs = require("dayjs");
import { List } from "~/Components/List";
import {
  faFastBackward,
  faFastForward,
  faFilter,
  faSortAlphaDown,
  faSortAlphaUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Filter } from "~Components/Base/Filter";
import { Control, Color } from "~Components/Base/Control";

type State = {
  selected: Castle | null;
  zoom: number;
  sortingRule: SortingRule | null;
  filteredCondition: Condition | null;
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
    filteredCondition: null,
  });

  const sorters = [
    {
      sortingRule: { type: SortType.Alphanumeric },
      compareFn: (a: Castle, b: Castle) => a.name.localeCompare(b.name),
      icon: faSortAlphaDown,
    },
    {
      sortingRule: { type: SortType.Alphanumeric, desc: true },
      compareFn: (a: Castle, b: Castle) => b.name.localeCompare(a.name),
      icon: faSortAlphaUp,
    },
    {
      sortingRule: { type: SortType.Datetime, desc: true },
      compareFn: (a: Castle, b: Castle) => (dayjs(a.visited).isBefore(dayjs(b.visited)) ? 1 : -1),
      icon: faFastBackward,
    },
    {
      sortingRule: { type: SortType.Datetime },
      compareFn: (a: Castle, b: Castle) => (dayjs(a.visited).isAfter(dayjs(b.visited)) ? 1 : -1),
      icon: faFastForward,
    },
  ];

  const conditionFilterOptions = [
    { condition: null, label: "All" },
    { condition: Condition.Ruins, label: "Ruins" },
    { condition: Condition.Reconstructed, label: "Reconstructed" },
    { condition: Condition.Original, label: "Original" },
  ];

  const conditionFilterFn = (selected: { condition: Condition | null; label: string }) => (item: Castle) =>
    selected.condition ? item.condition == selected.condition : true;

  return (
    <div className="h-screen flex">
      <List
        data={castles}
        renderItem={castle => (
          <Summary
            castle={castle}
            isActive={state.selected ? castle.id == state.selected.id : false}
            onClick={() => setState(state => ({ ...state, selected: castle }))}
          />
        )}
        render={(list, sort, filter, next, previous, reset) => (
          <>
            <div className="w-80 flex flex-col">
              <h1 className="bg-green-900 text-white flex items-center justify-center p-4 text-xl">
                Castles are cool!
              </h1>
              <ul className="flex justify-between p-3">
                {sorters.map(({ sortingRule, compareFn, icon }, key) => (
                  <li key={key}>
                    <Control
                      icon={icon}
                      isActive={
                        state.sortingRule?.type == sortingRule.type && state.sortingRule?.desc == sortingRule.desc
                      }
                      onClick={() => {
                        setState(state => ({ ...state, sortingRule: sortingRule }));
                        sort(compareFn);
                      }}
                    />
                  </li>
                ))}
                <li>
                  <Filter
                    options={conditionFilterOptions}
                    isSelected={({ condition }) => condition == state.filteredCondition}
                    toLabel={({ label }) => label}
                    onChange={selected => {
                      setState(state => ({ ...state, filteredCondition: selected.condition }));
                      filter(conditionFilterFn(selected));
                    }}
                  >
                    <Control icon={faFilter} isActive={Boolean(state.filteredCondition)} />
                  </Filter>
                </li>
                <li>
                  <Control
                    icon={faTimes}
                    color={Color.Secondary}
                    onClick={() => {
                      reset();
                      setState(state => ({ ...state, sortingRule: null, filteredCondition: null }));
                    }}
                  />
                </li>
              </ul>
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
  );
}

export { App };
