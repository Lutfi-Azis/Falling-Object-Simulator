import classes from "./Volleyball.module.css";
import { FC, useEffect, useRef } from "react";
import BallImage from "./volleyball.png";
import CriticalState from "./CriticalState";
import { map } from "../utils";

type Props = {
  leftOffset?: number;
  boardTipY: number;
  getParentHeight: () => number;
  criticalState: CriticalState;
  /**
   * Initial ball height (m)
   */
  initialBallHeight: number;
};

const Volleyball: FC<Props> = (props) => {
  const imgRef = useRef<HTMLImageElement>(null);

  const minTop = props.boardTipY - 60;
  const maxTop = props.getParentHeight() - 60;

  useEffect(() => {
    const handleBallHeightChange = (height: number) => {
      imgRef.current!.style.top =
        map(height, 0, props.initialBallHeight, maxTop, minTop).toString() +
        "px";
    };

    handleBallHeightChange(props.criticalState.ballHeight.getLatest());
    props.criticalState.ballHeight.subscribe(handleBallHeightChange);

    return () => {
      props.criticalState.ballHeight.unsubscribe(handleBallHeightChange);
    };
  }, [props.criticalState, props.initialBallHeight, minTop, maxTop]);

  return (
    <img
      className={classes.volleyball}
      src={BallImage}
      alt="Volleyball"
      style={{
        left: props.leftOffset ? `${props.leftOffset}px` : undefined,
      }}
      ref={imgRef}
    />
  );
};

export default Volleyball;
