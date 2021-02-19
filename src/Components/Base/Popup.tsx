import { faTimes } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Shape, Button } from "~/Components/Base/Button";

type Props = {
  className?: string;
  onClose: () => void;
  header: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
};

function Popup(props: Props): JSX.Element {
  return (
    <div className={["shadow flex flex-col", props.className].join(" ")}>
      <div className="bg-green-900">
        <div className="py-3 px-3">
          <div className="flex items-center justify-between">
            <div className="w-0 flex-1 flex items-center">
              <div className="ml-3 text-white">{props.header}</div>
            </div>
            <div className="flex-shrink-0">
              <Button shape={Shape.Icon} onClick={props.onClose} icon={faTimes} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-white overflow-auto">{props.children}</div>
      {props.footer ? <div className="bg-white">{props.footer}</div> : <></>}
    </div>
  );
}

export { Popup };
