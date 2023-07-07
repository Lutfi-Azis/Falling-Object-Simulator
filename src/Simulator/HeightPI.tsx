import { FC, useRef, useCallback } from "react";
import classes from "./HeightPI.module.css";
import CriticalState from "./CriticalState";
import { map } from "../utils";
import ChannelPI from "./ChannelPI";
import { heightToProgress } from "./bantuan";

type Props = {
  boardTipY: number;
  getParentHeight: () => number;
  onChange?: (value: number) => void;
  criticalState: CriticalState;
  initialBallHeight: number;
  endTime: number;
  gravity: number;
  initialVelocity?: number;
};

const HeightPI: FC<Props> = ({
  criticalState,
  boardTipY,
  getParentHeight,
  initialBallHeight,
  initialVelocity = 0,
  gravity,
  endTime,
}) => {
  const labelRef = useRef<HTMLParagraphElement>(null);

  const a = boardTipY - 60;
  const parentHeight = getParentHeight();
  const minTop = a + (parentHeight - a) / 2;
  const maxTop = parentHeight - 60;

  const handleNotification = useCallback(
    (ballHeight: number) => {
      labelRef.current!.style.top =
        map(ballHeight, 0, initialBallHeight, maxTop, minTop).toString() + "px";
    },
    [initialBallHeight, maxTop, minTop]
  );

  const handleInput = (value: string) => {
    let ballHeight = parseFloat(value);

    if (ballHeight < 0) ballHeight = 0;
    if (ballHeight > initialBallHeight) ballHeight = initialBallHeight;
    criticalState.progress.notify(
      heightToProgress(
        ballHeight,
        initialBallHeight,
        initialVelocity,
        gravity,
        endTime
      )
    );
  };

  return (
    <div className={classes.heightLabel} ref={labelRef}>
      <ChannelPI
        name="h"
        channel={criticalState.ballHeight}
        suffix="m"
        onNotification={handleNotification}
        containerRef={labelRef}
        onEnter={handleInput}
      />
    </div>
  );
};

export default HeightPI;
