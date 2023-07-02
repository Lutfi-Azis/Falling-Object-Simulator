import { FC, useEffect, useRef } from "react";
import classes from "./HeightPI.module.css";
import ParamNumberInput from "./ParamNumberInput";
import CriticalState from "./CriticalState";
import { map } from "../utils";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  const a = boardTipY - 60;
  const parentHeight = getParentHeight();
  const minTop = a + (parentHeight - a) / 2;
  const maxTop = parentHeight - 60;

  useEffect(() => {
    const handleBallHeightChange = (value: number) => {
      if (Math.abs(value) < 0.01) value = 0;
      inputRef.current!.value = value.toFixed(1);
      labelRef.current!.style.top =
        map(value, 0, initialBallHeight, maxTop, minTop).toString() + "px";
    };

    handleBallHeightChange(criticalState.ballHeight.getLatest());
    criticalState.ballHeight.subscribe(handleBallHeightChange);

    return () => {
      criticalState.ballHeight.unsubscribe(handleBallHeightChange);
    };
  }, [initialBallHeight, minTop, maxTop, criticalState]);

  return (
    <ParamNumberInput
      className={classes.heightLabel}
      name="h"
      units="m"
      maxInputWidth="6ch"
      inputRef={inputRef}
      containerRef={labelRef}
    />
  );
};

export default HeightPI;
