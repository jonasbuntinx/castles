import * as React from "react";
import { usePopper } from "react-popper";

type SelectProps<D> = {
  options: D[];
  isSelected: (value: D) => boolean;
  toLabel: (value: D) => React.ReactNode;
  onChange: (value: D) => void;
  children: React.ReactNode;
};

const Filter = <D extends Record<string, unknown>>(props: SelectProps<D>): JSX.Element => {
  const [visible, setVisibility] = React.useState(false);
  const referenceRef = React.useRef<HTMLDivElement>(null);
  const popperRef = React.useRef<HTMLDivElement>(null);
  const { styles: pStyles, attributes } = usePopper(referenceRef.current, popperRef.current, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        enabled: true,
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "preventOverflow",
        enabled: false,
      },
    ],
  });
  React.useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (popperRef.current && popperRef.current.contains(event.target as Node)) {
        return;
      }
      setVisibility(false);
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);
  return (
    <div className="relative">
      <div ref={referenceRef} onClick={() => setVisibility(true)}>
        {props.children}
      </div>
      <div ref={popperRef} style={{ zIndex: 50, minWidth: "200px", ...pStyles.popper }} {...attributes.popper}>
        <div className="bg-white shadow" style={visible && props.options.length > 0 ? undefined : { display: "none" }}>
          {props.options.map((option, i) => (
            <div
              key={i}
              className={
                "flex items-center p-5 focus:outline-none cursor-pointer" +
                (props.isSelected(option) ? " bg-blue-50 text-blue-600" : " hover:bg-blue-50 hover:text-blue-600")
              }
              onClick={() => {
                props.onChange(option);
                setVisibility(false);
              }}
            >
              {props.toLabel(option)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Filter };
