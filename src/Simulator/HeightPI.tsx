import { FC, useRef } from "react";
import classes from "./HeightPI.module.css";
import CriticalState from "./CriticalState";
import { map } from "../utils";
import ChannelPI from "./ChannelPI";

type Props = {
  boardTipY: number;
  getParentHeight: () => number;
  onChange?: (value: number) => void;
  criticalState: CriticalState;
  initialBallHeight: number;
};

const HeightPI: FC<Props> = ({
  criticalState,
  boardTipY,
  getParentHeight,
  initialBallHeight,
}) => {
  const labelRef = useRef<HTMLParagraphElement>(null);

  const a = boardTipY - 60;
  const parentHeight = getParentHeight();
  const minTop = a + (parentHeight - a) / 2;
  const maxTop = parentHeight - 60;

  const handleNotification = () => {
    const ballHeight = criticalState.ballHeight.getLatest();
    labelRef.current!.style.top =
      map(ballHeight, 0, initialBallHeight, maxTop, minTop).toString() + "px";
  };

  return (
    <div className={classes.heightLabel} ref={labelRef}>
      <ChannelPI
        name="h"
        channel={criticalState.time}
        suffix="s"
        onNotification={handleNotification}
        containerRef={labelRef}
      />
    </div>
  );
};

export default HeightPI;
