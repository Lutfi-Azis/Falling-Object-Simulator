import { FC, useCallback, useRef } from "react";
import classes from "./WetArea.module.css";
import Volleyball from "./Volleyball";
import HeightPI from "./HeightPI";
import CriticalState from "./CriticalState";
import TopRightGroup from "./TopRightGroup";

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
    <div className={classes.wet} ref={divRef}>
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
      <TopRightGroup
        className={classes.topRightGroup}
        criticalState={props.criticalState}
      />
    </div>
  );
};

export default WetArea;
