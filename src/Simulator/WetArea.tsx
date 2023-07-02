import { FC, useCallback, useRef } from "react";
import Volleyball from "./Volleyball";
import HeightPI from "./HeightPI";
import CriticalState from "./CriticalState";

type Props = {
  boardTipY: number;
  criticalState: CriticalState;
  className?: string;
  initialBallHeight: number;
};

const WetArea: FC<Props> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const getHeight = useCallback(
    () => (divRef.current ? divRef.current.getBoundingClientRect().height : 0),
    []
  );
  return (
    <div className={props.className} ref={divRef}>
      <Volleyball
        leftOffset={130}
        boardTipY={props.boardTipY}
        getParentHeight={getHeight}
        initialBallHeight={props.initialBallHeight}
        criticalState={props.criticalState}
      />
      <HeightPI
        criticalState={props.criticalState}
        boardTipY={props.boardTipY}
        getParentHeight={getHeight}
        initialBallHeight={props.initialBallHeight}
      />
    </div>
  );
};

export default WetArea;
