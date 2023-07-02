import { FC } from "react";
import classes from "./TopRightGroup.module.css";
import CriticalState from "./CriticalState";
import ChannelPI from "./ChannelPI";

type Props = {
  criticalState: CriticalState;
  className?: string;
};

const TopRightGroup: FC<Props> = ({ criticalState, className }) => {
  return (
    <div className={className}>
      <ChannelPI
        channel={criticalState.potentialEnergy}
        name="Ep"
        suffix="j"
        fit={false}
        className={classes.channelPI}
      />
      <ChannelPI
        channel={criticalState.kineticEnergy}
        name="Ek"
        suffix="j"
        fit={false}
        className={classes.channelPI}
      />
      <ChannelPI
        channel={criticalState.velocity}
        name="v"
        suffix="m/s"
        fit={false}
        className={classes.channelPI}
      />
    </div>
  );
};

export default TopRightGroup;
