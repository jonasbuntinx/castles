import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import { Color, IconButton } from "./Button";

type Props = {
  onBack: () => void;
  onForward: () => void;
};

function Navigation(props: Props): JSX.Element {
  return (
    <div className="flex flex-row justify-between">
      <IconButton color={Color.Gray} icon={faChevronLeft} onClick={props.onBack} />
      <IconButton color={Color.Gray} icon={faChevronRight} onClick={props.onForward} />
    </div>
  );
}

export { Navigation };
