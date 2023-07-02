import { FC, useEffect, useRef } from "react";
import ParamNumberInput from "./ParamNumberInput";
import CriticalState from "./CriticalState";

type Props = {
  onChange?: (value: number) => void;
  criticalState: CriticalState;
};

const HeightPI: FC<Props> = ({ criticalState }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current!.value = criticalState.ballHeight.getLatest().toString();
    const handleBallHeightChange = (value: number) => {
      inputRef.current!.value = value.toFixed(1);
    };
    const handleProgressChange = () => {
      return;
    };

    criticalState.ballHeight.subscribe(handleBallHeightChange);
    criticalState.progress.subscribe(handleProgressChange);

    return () => {
      criticalState.ballHeight.unsubscribe(handleBallHeightChange);
      criticalState.progress.unsubscribe(handleProgressChange);
    };
  }, [criticalState]);

  return (
    <ParamNumberInput
      name="h"
      units="m"
      maxInputWidth="6ch"
      inputRef={inputRef}
    />
  );
};

export default HeightPI;
