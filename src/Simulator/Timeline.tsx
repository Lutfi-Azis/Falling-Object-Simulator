import { FC, useCallback, useEffect, useRef } from "react";
import classes from "./Timeline.module.css";
import CriticalState from "./CriticalState";

type Props = {
  criticalState: CriticalState;
  className?: string;
};

const Timeline: FC<Props> = ({ criticalState, className }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    criticalState.isPlaying.notify(!criticalState.isPlaying.getLatest());
  }, [criticalState]);

  const handleInputChange = useCallback(() => {
    criticalState.progress.notify(parseInt(sliderRef.current!.value) / 1000);
  }, [criticalState]);

  useEffect(() => {
    const handlePlayStateChange = (isPlaying: boolean) => {
      btnRef.current!.innerText = isPlaying ? "Pause" : "Play";
    };
    const handleProgressChange = (progress: number) => {
      sliderRef.current!.value = (progress * 1000).toString();
    };

    handlePlayStateChange(criticalState.isPlaying.getLatest());
    criticalState.isPlaying.subscribe(handlePlayStateChange);
    criticalState.progress.subscribe(handleProgressChange);

    return () => {
      criticalState.isPlaying.unsubscribe(handlePlayStateChange);
      criticalState.progress.unsubscribe(handleProgressChange);
    };
  }, [criticalState]);

  return (
    <div className={`${classes.timeline} ${className}`}>
      <button ref={btnRef} onClick={handleClick}>
        Play
      </button>
      <input
        defaultValue={0}
        className={classes.timelineSlider}
        min={0}
        max={1000}
        step={1}
        type="range"
        onChange={handleInputChange}
        ref={sliderRef}
      />
    </div>
  );
};

export default Timeline;