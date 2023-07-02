import { FC, Ref } from "react";
import classes from "./ParamInput.module.css";

export type CommonProps = {
  className?: string;
  maxInputWidth?: string;
  inputRef?: Ref<HTMLInputElement>;
  containerRef?: Ref<HTMLParagraphElement>;
  fit?: boolean;
};

type Props = CommonProps & {
  prefix?: string;
  value?: string;
  suffix?: string;
  onChange?: (value: string) => void;
};

const ParamInput: FC<Props> = ({ fit = true, ...props }) => {
  let handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  if (props.onChange)
    handleChange = (event) => {
      props.onChange?.(event.target.value);
    };

  const styleObj: React.CSSProperties = {
    maxWidth: props.maxInputWidth,
  };

  if (fit) styleObj.width = props.value ? `${props.value.length}ch` : "5ch";

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
        style={styleObj}
        ref={props.inputRef}
      />{" "}
      {props.suffix}
    </p>
  );
};

export default ParamInput;
