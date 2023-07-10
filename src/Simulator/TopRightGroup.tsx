import { FC } from "react";
import classes from "./TopRightGroup.module.css";
import CriticalState from "./CriticalState";
import ChannelPI from "./ChannelPI";
import { kineticToProgress, potentialToProgress } from "./bantuan";

type Props = {
  criticalState: CriticalState;
  className?: string;
  initialHeight: number;
  initialVelocity: number;
  gravity: number;
  endTime: number;
  mass: number;
  handleVelocityInput?: (value: number) => void;
};

const TopRightGroup: FC<Props> = ({
  criticalState,
  className,
  initialVelocity,
  gravity,
  endTime,
  initialHeight,
  mass,
  handleVelocityInput,
}) => {
  const handleVelocityStrInput = (value: string) => {
    const velocity = parseFloat(value);
    if (velocity - criticalState.velocity.getLatest() < 0.01) return;
    handleVelocityInput?.(velocity);
  };
  const handlePotentialInput = (value: string) => {
    const potential = parseFloat(value);
    let progress = potentialToProgress(
      potential,
      mass,
      gravity,
      initialHeight,
      initialVelocity,
      endTime
    );

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    criticalState.progress.notify(progress);
  };
  const handleKineticInput = (value: string) => {
    const kinetic = parseFloat(value);
    let progress = kineticToProgress(
      kinetic,
      mass,
      initialVelocity,
      gravity,
      endTime
    );

    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;

    criticalState.progress.notify(progress);
  };

  return (
    <div className={className}>
      <ChannelPI
        channel={criticalState.potentialEnergy}
        name="Ep"
        suffix="j"
        fit={false}
        className={classes.channelPI}
        onEnter={handlePotentialInput}
      />
      <ChannelPI
        channel={criticalState.kineticEnergy}
        name="Ek"
        suffix="j"
        fit={false}
        className={classes.channelPI}
        onEnter={handleKineticInput}
      />
      <ChannelPI
        channel={criticalState.velocity}
        name="v"
        suffix="m/s"
        fit={false}
        className={classes.channelPI}
        onEnter={handleVelocityStrInput}
      />
    </div>
  );
};

export default TopRightGroup;
