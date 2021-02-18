import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Color, IconButton } from "./Button";

type Props = {
  position: { x: number; y: number };
  isOpen: boolean;
  onClose: () => void;
  header: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

function Popup(props: Props): JSX.Element {
  return props.isOpen ? (
    <div
      className="absolute shadow flex flex-col"
      style={{ width: "300px", height: "350px", top: props.position.y - 175, left: props.position.x + 50 }}
    >
      <div className="bg-green-900">
        <div className="py-3 px-3">
          <div className="flex items-center justify-between">
            <div className="w-0 flex-1 flex items-center">
              <div className="ml-3 text-white">{props.header}</div>
            </div>
            <div className="flex-shrink-0">
              <IconButton color={Color.Green} onClick={props.onClose} icon={faTimes} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white overflow-auto">{props.children}</div>
      {props.footer ? <div className="bg-white">{props.footer}</div> : <></>}
    </div>
  ) : (
    <></>
  );
}

export { Popup };
