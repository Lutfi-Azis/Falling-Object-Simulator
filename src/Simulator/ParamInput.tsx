import { FC } from "react";
import classes from "./ParamInput.module.css";

export type CommonProps = {
  className?: string;
  maxInputWidth?: string;
};

type props = CommonProps & {
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
    <p className={classes.param + " " + props.className}>
      {props.prefix}{" "}
      <input
        type="text"
        className={classes.paramInput}
        value={props.value}
        onChange={handleChange}
        style={{
          width: props.value ? `${props.value.length}ch` : "5ch",
          maxWidth: props.maxInputWidth,
        }}
      />{" "}
      {props.suffix}
    </p>
  );
};

export default ParamInput;
