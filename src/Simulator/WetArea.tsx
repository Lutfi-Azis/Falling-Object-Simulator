import { FC, useRef } from "react";
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
  endTime: number;
  gravity: number;
  initialVelocity?: number;
  mass: number;
  onSelect?: (name: string) => void;
  selectable?: boolean;
  handleVelocityInput?: (value: number) => void;
};

const WetArea: FC<Props> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const getHeight = () =>
    divRef.current ? divRef.current.getBoundingClientRect().height : 0;
  return (
    <div className={classes.wet} ref={divRef}>
      <Volleyball
        leftOffset={170}
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
        endTime={props.endTime}
        gravity={props.gravity}
        initialVelocity={props.initialVelocity}
      />
      <TopRightGroup
        className={classes.topRightGroup}
        criticalState={props.criticalState}
        endTime={props.endTime}
        gravity={props.gravity}
        initialVelocity={props.initialVelocity ? props.initialVelocity : 0}
        initialHeight={props.initialBallHeight}
        mass={props.mass}
        handleVelocityInput={props.handleVelocityInput}
      />
    </div>
  );
};

export default WetArea;
