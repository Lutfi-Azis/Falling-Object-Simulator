import classes from "./Volleyball.module.css";
import { FC } from "react";
import BallImage from "./volleyball.png";

type props = {
  leftOffset?: number;
  boardTipY: number;
};

const Volleyball: FC<props> = (props) => {
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
