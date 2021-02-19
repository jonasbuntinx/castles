import * as React from "react";

type Props<D extends { id: number }> = {
  data: D[];
  renderItem: (item: D) => JSX.Element;
  render: (
    list: JSX.Element,
    sort: (compareFn: ((a: D, b: D) => number) | null) => void,
    filter: (filterFn: ((item: D) => boolean) | null) => void,
    next: (item: D | null) => D | null,
    previous: (item: D | null) => D | null,
    reset: () => void
  ) => JSX.Element;
};

const prepareData = <D extends { id: number }>(
  data: D[],
  filterFn: ((item: D) => boolean) | null,
  compareFn: ((a: D, b: D) => number) | null
) => {
  const filteredData = filterFn ? data.filter(filterFn) : [...data];

  const sortedData = compareFn ? filteredData.sort(compareFn) : filteredData;

  return sortedData;
};

function List<D extends { id: number }>(props: Props<D>): JSX.Element {
  const [preparedState, setPreparedState] = React.useState<D[]>(props.data);

  const compareFn = React.useRef<((a: D, b: D) => number) | null>(null);

  const filterFn = React.useRef<((item: D) => boolean) | null>(null);

  const cachedData = React.useRef<D[]>(props.data);

  const sort = (fn: ((a: D, b: D) => number) | null) => {
    compareFn.current = fn;
    const newData = prepareData(props.data, filterFn.current, fn);
    cachedData.current = newData;
    setPreparedState(newData);
    return newData;
  };

  const filter = (fn: ((item: D) => boolean) | null) => {
    filterFn.current = fn;
    const newData = prepareData(props.data, fn, compareFn.current);
    cachedData.current = newData;
    setPreparedState(newData);
    return newData;
  };

  const next = (currentItem: D | null) => {
    const currentIndex = cachedData.current.findIndex(item => (currentItem ? item.id == currentItem.id : false));
    const nextIndex = (currentIndex + 1) % cachedData.current.length;
    return cachedData.current[nextIndex];
  };

  const previous = (currentItem: D | null) => {
    const currentIndex = cachedData.current.findIndex(item => (currentItem ? item.id == currentItem.id : false));
    const prevIndex = (currentIndex + cachedData.current.length - 1) % cachedData.current.length;
    return cachedData.current[prevIndex];
  };

  const reset = React.useCallback(() => {
    filterFn.current = null;
    compareFn.current = null;
    cachedData.current = props.data;
    setPreparedState(props.data);
  }, [props.data]);

  return props.render(
    <>
      {preparedState.map((item, key) => (
        <React.Fragment key={key}>{props.renderItem(item)}</React.Fragment>
      ))}
    </>,
    sort,
    filter,
    next,
    previous,
    reset
  );
}

export { List };
