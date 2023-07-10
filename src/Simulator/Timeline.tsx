import { FC, useEffect, useRef } from "react";
import classes from "./Timeline.module.css";
import CriticalState from "./CriticalState";
import ChannelPI from "./ChannelPI";
import ParamNumberInput from "./ParamNumberInput";

type Props = {
  criticalState: CriticalState;
  endTime: number;
  className?: string;
  playSpeed: number;
  onSpeedChange?: (value: number) => void;
  onSelect?: (name: string) => void;
  selectable?: boolean;
};

const Timeline: FC<Props> = ({
  criticalState,
  endTime,
  className,
  playSpeed,
  onSpeedChange,
  onSelect,
  selectable,
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (criticalState.progress.getLatest() === 1)
      criticalState.progress.notify(0);

    criticalState.isPlaying.notify(!criticalState.isPlaying.getLatest());
  };

  const handleInputChange = () => {
    criticalState.progress.notify(parseInt(sliderRef.current!.value) / 1000);
  };

  const handleChannelTChange = (t: number) => {
    let progress = t / endTime;
    if (progress > 1) progress = 1;
    else if (progress < 0) progress = 0;

    criticalState.progress.notify(progress);
  };

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
      <div className={classes.timelineControls}>
        <button
          className={classes.togglePlay}
          ref={btnRef}
          onClick={handleClick}
        >
          Play
        </button>
        <div className={classes.divider} />

        <ChannelPI
          name="t"
          channel={criticalState.time}
          suffix="s"
          onChange={handleChannelTChange}
          onSelect={onSelect}
          selectable={selectable}
        />
        <div className={classes.divider} />
        <ParamNumberInput
          name="Speed"
          units="x"
          value={playSpeed}
          onChange={onSpeedChange}
        />
      </div>

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
