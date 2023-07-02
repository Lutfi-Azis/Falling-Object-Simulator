import { FC, Ref } from "react";
import classes from "./ParamInput.module.css";

export type CommonProps = {
  className?: string;
  maxInputWidth?: string;
  inputRef?: Ref<HTMLInputElement>;
  containerRef?: Ref<HTMLParagraphElement>;
};

type Props = CommonProps & {
  prefix?: string;
  value?: string;
  suffix?: string;
  onChange?: (value: string) => void;
};

const ParamInput: FC<Props> = (props) => {
  let handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  if (props.onChange)
    handleChange = (event) => {
      props.onChange?.(event.target.value);
    };

  return (
    <p
      className={classes.param + " " + props.className}
      ref={props.containerRef}
    >
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
        ref={props.inputRef}
      />{" "}
      {props.suffix}
    </p>
  );
};

export default ParamInput;
