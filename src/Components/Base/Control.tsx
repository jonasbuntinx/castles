import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

type Props = {
  icon: IconDefinition;
  color?: Color;
  isActive?: boolean;
  onClick?: () => void;
};

enum Color {
  Primary = "primary",
  Secondary = "secondary",
}

function Control(props: Props): JSX.Element {
  const color = props.color ? props.color : Color.Primary;
  const className = (() => {
    switch (color) {
      case Color.Primary:
        return props.isActive
          ? "border-blue-600 text-blue-600"
          : "border-gray-300 text-gray-900 hover:border-blue-600 hover:text-blue-600";
      case Color.Secondary:
        return "border-gray-300 text-gray-900 hover:border-red-600 hover:text-red-600";
    }
  })();

  return (
    <div
      className={"cursor-pointer px-3 h-8 flex items-center justify-center border border-gray-300 " + className}
      onClick={props.onClick}
    >
      <FontAwesomeIcon icon={props.icon} />
    </div>
  );
}

export { Control, Color };
