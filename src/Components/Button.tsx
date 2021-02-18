import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

type Props = {
  icon: IconDefinition;
  color: Color;
  onClick: () => void;
};

enum Color {
  Green = "green",
  Gray = "gray",
}

function IconButton(props: Props): JSX.Element {
  const { bg, text } = React.useMemo(() => {
    switch (props.color) {
      case Color.Green:
        return { bg: "bg-green-900 hover:bg-green-800", text: "text-white" };
      case Color.Gray:
        return { bg: "bg-gray-50 hover:bg-gray-200", text: "text-gray-700" };
    }
  }, [props.color]);
  return (
    <button
      type="button"
      className={"w-10 h-10 flex items-center justify-center rounded-md " + bg}
      onClick={props.onClick}
    >
      <FontAwesomeIcon className={text} icon={props.icon} />
    </button>
  );
}

export { IconButton, Color };
