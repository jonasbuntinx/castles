import { faChessRook, faHammer, faHouseDamage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Castle, Condition } from "~Data/Castle";

type Props = {
  castle: Castle;
};

function CastleSummary(props: Props): JSX.Element {
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
  return (
    <div className="flex">
      <div className={"flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full " + bg}>
        <FontAwesomeIcon className={text} icon={icon} />
      </div>
      <div className="flex-1 mt-1 ml-4 text-left text-gray-900">{props.castle.name}</div>
    </div>
  );
}

export { CastleSummary };
