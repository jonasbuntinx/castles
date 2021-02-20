import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Control, Color } from "~/Components/Base/Control";
import { Dropdown } from "~/Components/Base/Dropdown";

type Props<D extends { id: number }> = {
  data: D[];
  sorters: Sorter<D>[];
  filters: Filter<D>[];
  renderItem: (item: D) => JSX.Element;
  render: (
    list: JSX.Element,
    controls: JSX.Element,
    next: (item: D | null) => D | null,
    previous: (item: D | null) => D | null
  ) => JSX.Element;
};

type Sorter<D> = {
  id: string;
  compareFn: (a: D, b: D) => number;
  icon: IconDefinition;
};

type FilterValue = any; // eslint-disable-line @typescript-eslint/no-explicit-any

type Filter<D> = {
  id: string;
  values: FilterValue[];
  toLabel: (value: FilterValue) => string;
  filterFn: (value: FilterValue) => (item: D) => boolean;
  icon: IconDefinition;
};

function List<D extends { id: number }>(props: Props<D>): JSX.Element {
  const [preparedData, setPreparedData] = React.useState<D[]>(props.data);

  const activeSort = React.useRef<{ id: string; compareFn: (a: D, b: D) => number } | null>(null);

  const activeFilter = React.useRef<{
    id: string;
    value: FilterValue;
    filterFn: (item: D) => boolean;
  } | null>(null);

  const cachedData = React.useRef<D[]>(props.data);

  const prepareData = () => {
    const filterFn = activeFilter.current?.filterFn;

    const compareFn = activeSort.current?.compareFn;

    const filteredData = filterFn ? props.data.filter(filterFn) : [...props.data];

    const sortedData = compareFn ? filteredData.sort(compareFn) : filteredData;

    cachedData.current = sortedData;

    setPreparedData(sortedData);

    return sortedData;
  };

  const reset = React.useCallback(() => {
    activeFilter.current = null;

    activeSort.current = null;

    cachedData.current = props.data;

    setPreparedData(props.data);
  }, [props.data]);

  const findInCachedData = (currentItem: D | null) =>
    cachedData.current.findIndex((item: D) => (currentItem ? item.id == currentItem.id : false));

  const next = (currentItem: D | null) => {
    const currentIndex = findInCachedData(currentItem);

    const nextIndex = (currentIndex + 1) % cachedData.current.length;

    return cachedData.current[nextIndex];
  };

  const previous = (currentItem: D | null) => {
    const currentIndex = findInCachedData(currentItem);

    const prevIndex = (currentIndex + cachedData.current.length - 1) % cachedData.current.length;

    return cachedData.current[prevIndex];
  };

  return props.render(
    <>
      {preparedData.map((item, key) => (
        <React.Fragment key={key}>{props.renderItem(item)}</React.Fragment>
      ))}
    </>,
    <ul className="flex justify-between p-3">
      {props.sorters.map(({ id, compareFn, icon }, key) => (
        <li key={key}>
          <Control
            icon={icon}
            isActive={activeSort.current?.id == id}
            onClick={() => {
              activeSort.current = { id, compareFn };
              prepareData();
            }}
          />
        </li>
      ))}
      {props.filters.map(({ id, values, filterFn, toLabel, icon }, key) => (
        <li key={key}>
          <Dropdown
            options={values}
            isSelected={value => value == activeFilter.current?.value && activeFilter.current?.id == id}
            toLabel={toLabel}
            onChange={value => {
              activeFilter.current = { id, value, filterFn: filterFn(value) };
              prepareData();
            }}
          >
            <Control icon={icon} isActive={activeFilter.current?.id == id && Boolean(activeFilter.current?.value)} />
          </Dropdown>
        </li>
      ))}
      <li>
        <Control icon={faTimes} color={Color.Secondary} onClick={reset} />
      </li>
    </ul>,
    next,
    previous
  );
}

export { List };
