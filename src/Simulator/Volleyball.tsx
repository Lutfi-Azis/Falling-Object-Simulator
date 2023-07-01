import classes from "./Volleyball.module.css";
import { FC } from "react";
import BallImage from "./volleyball.png";

type Props = {
  leftOffset?: number;
  boardTipY: number;
};

const Volleyball: FC<Props> = (props) => {
  return (
    <img
      className={classes.volleyball}
      src={BallImage}
      alt="Volleyball"
      style={{
        left: props.leftOffset ? `${props.leftOffset}px` : undefined,
        top: props.boardTipY - 60,
      }}
    />
  );
};

export default Volleyball;
