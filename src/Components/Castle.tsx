import { faCheck, faChessRook, faHammer, faHouseDamage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs = require("dayjs");
import * as React from "react";
import { Castle, Condition } from "~/Data/Castle";
import { Color, Button } from "~/Components/Base/Button";
import { Popup as BasePopup } from "~/Components/Base/Popup";

type Props = {
  castle: Castle;
  className?: string;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
};

function Popup(props: Props): JSX.Element {
  const { bg, text, icon } = React.useMemo(() => {
    switch (props.castle.condition) {
      case Condition.Ruins:
        return { bg: "bg-red-100", text: "text-red-600", icon: faHouseDamage };
      case Condition.Reconstructed:
        return { bg: "bg-yellow-100", text: "text-yellow-600", icon: faHammer };
      case Condition.Original:
        return { bg: "bg-green-100", text: "text-green-600", icon: faChessRook };
    }
  }, [props.castle.condition]);

  const header = (
    <>
      <h1 className="font-medium truncate">{props.castle.name}</h1>
      {props.castle.visited ? (
        <h3 className="flex items-center justify-center text-xs mt-1">
          <span className="mr-2">{dayjs(props.castle.visited).format("DD/MM/YYYY")}</span>
          <FontAwesomeIcon className={"text-xs"} icon={faCheck} />
        </h3>
      ) : (
        <></>
      )}
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
    <BasePopup className={props.className} onClose={() => props.onClose()} header={header} footer={footer}>
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        <div className="flex-1 flex overflow-hidden h-full ">
          <div className="px-4 pt-3 pb-2">
            <div className={"flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full " + bg}>
              <FontAwesomeIcon className={"text-xs " + text} icon={icon} />
            </div>
          </div>
          <div className="flex-1 pr-4 pt-3 pb-2 overflow-auto">
            <div className="text-left text-sm text-gray-900">{props.castle.description}</div>
          </div>
        </div>
      </div>
    </BasePopup>
  );
}

export { Popup };
