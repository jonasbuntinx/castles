import { faChessRook, faHammer, faHouseDamage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs = require("dayjs");
import * as React from "react";
import { Castle, Condition } from "~/Data/Castle";
import { Color, Button } from "~/Components/Base/Button";
import * as Base from "~/Components/Base/ControlledModal";

// ConditionIcon
type ConditionIconProps = { condition: Condition };

const ConditionIcon = ({ condition }: ConditionIconProps): JSX.Element => {
  const { bg, text, icon } = (() => {
    switch (condition) {
      case Condition.Ruins:
        return { bg: "bg-red-100", text: "text-red-600", icon: faHouseDamage };
      case Condition.Reconstructed:
        return { bg: "bg-yellow-100", text: "text-yellow-600", icon: faHammer };
      case Condition.Original:
        return { bg: "bg-green-100", text: "text-green-600", icon: faChessRook };
    }
  })();
  return (
    <div className={"flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full " + bg}>
      <FontAwesomeIcon className={"text-xs " + text} icon={icon} />
    </div>
  );
};

// Popup
type ControlledModalProps = {
  castle: Castle;
  className?: string;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

function ControlledModal(props: ControlledModalProps): JSX.Element {
  const header = (
    <>
      <h1 className="font-medium truncate">{props.castle.name}</h1>
      <h3 className="text-xs mt-1">{dayjs(props.castle.visited).format("DD/MM/YYYY")}</h3>
    </>
  );

  const footer = (
    <div className="flex flex-row justify-between border-t border-gray-200  p-3">
      <Button color={Color.Secondary} onClick={props.onPrevious}>
        Previous
      </Button>
      <Button onClick={props.onNext}>Next</Button>
    </div>
  );

  return (
    <Base.ControlledModal className={props.className} onClose={() => props.onClose()} header={header} footer={footer}>
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <div className="flex-1 flex overflow-hidden h-full ">
          <div className="px-4 pt-3 pb-2">
            <ConditionIcon condition={props.castle.condition} />
          </div>
          <div className="flex-1 pr-4 pt-3 pb-2 overflow-auto">
            <div className="text-left text-sm text-gray-900">{props.castle.description}</div>
          </div>
        </div>
      </div>
    </Base.ControlledModal>
  );
}

// Summary
type SummaryProps = {
  castle: Castle;
  className?: string;
  isActive: boolean;
  onClick: () => void;
};

function Summary(props: SummaryProps): JSX.Element {
  return (
    <li
      className={
        props.className +
        " cursor-pointer py-5 px-4 text-gray-900 bg-white hover:text-green-900 border-r-4 border-white " +
        (props.isActive ? "border-green-900 text-green-900" : "hover:border-green-500 hover:text-green-900")
      }
      onClick={props.onClick}
    >
      <h1 className="flex gap-2 font-medium truncate">
        {props.castle.name}
        <ConditionIcon condition={props.castle.condition} />
      </h1>
      <h3 className="text-xs mt-2">{"Visited: " + dayjs(props.castle.visited).format("DD/MM/YYYY")}</h3>
    </li>
  );
}

export { ControlledModal, Summary };
