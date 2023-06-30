import { FC } from "react";
import classes from "./ParamInput.module.css";

type props = {
  prefix?: string;
  value?: string;
  suffix?: string;
  onChange?: (value: string) => void;
};

const ParamInput: FC<props> = (props) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    props.onChange?.(event.target.value);
  };

  return (
    <p className={classes.param}>
      {props.prefix}{" "}
      <input
        type="text"
        className={classes.paramInput}
        value={props.value}
        onChange={handleChange}
      />{" "}
      {props.suffix}
    </p>
  );
};

export default ParamInput;
