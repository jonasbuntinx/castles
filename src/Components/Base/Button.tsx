import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";

type Props = {
  icon?: IconDefinition;
  color?: Color;
  shape?: Shape;
  onClick: () => void;
  children?: React.ReactNode;
};

enum Color {
  Primary = "primary",
  Secondary = "secondary",
}

enum Shape {
  Icon = "icon",
  Default = "default",
}

function Button(props: Props): JSX.Element {
  const color = props.color ? props.color : Color.Primary;
  const { bgClassnames, textClassnames } = (() => {
    switch (color) {
      case Color.Primary:
        return { bgClassnames: "bg-green-900 hover:bg-green-800", textClassnames: "text-white" };
      case Color.Secondary:
        return { bgClassnames: "bg-gray-50 hover:bg-gray-200", textClassnames: "text-gray-700" };
    }
  })();
  const shape = props.shape ? props.shape : Shape.Default;
  const { shapeClassnames } = (() => {
    switch (shape) {
      case Shape.Default:
        return { shapeClassnames: "h-10" };
      case Shape.Icon:
        return {
          shapeClassnames: "w-10 h-10",
        };
    }
  })();
  const icon = props.icon ? <FontAwesomeIcon className={textClassnames} icon={props.icon} /> : <></>;
  return (
    <button
      type="button"
      className={[shapeClassnames, bgClassnames, "flex items-center justify-center rounded-md"].join(" ")}
      onClick={props.onClick}
    >
      {(() => {
        switch (shape) {
          case Shape.Default:
            return (
              <span className={[textClassnames, "px-3"].join(" ")}>
                {props.icon ? (
                  <>
                    <span className="mr-2">{icon}</span>
                    {props.children}
                  </>
                ) : (
                  props.children
                )}
              </span>
            );
          case Shape.Icon:
            return icon;
        }
      })()}
    </button>
  );
}

export { Button, Color, Shape };
