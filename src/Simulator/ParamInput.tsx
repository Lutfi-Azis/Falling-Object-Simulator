import { FC, Ref, useEffect, useState, RefObject } from "react";
import classes from "./ParamInput.module.css";

export type CommonProps = {
  className?: string;
  maxInputWidth?: string;
  inputRef?: RefObject<HTMLInputElement>;
  containerRef?: Ref<HTMLParagraphElement>;
  fit?: boolean;
  delayed?: boolean;
  disabled?: boolean;
  onEnter?: (value: string) => void;
  tabIndex?: number;
};

type Props = CommonProps & {
  prefix?: string;
  value?: string;
  suffix?: string;
  onChange?: (value: string) => void;
};

const ParamInput: FC<Props> = ({ fit = true, value, ...props }) => {
  let handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!props.delayed) props.onChange?.(event.target.value);
    setInputValue(event.target.value);
  };

  if (props.onChange && props.delayed) {
    handleKeyDown = (event) => {
      if (event.key !== "Enter") return;
      // Indirectly calls props.onChange
      event.currentTarget.blur();
    };
  }

  const styleObj: React.CSSProperties = {
    maxWidth: props.maxInputWidth,
  };

  if (fit) styleObj.width = value ? `${value.length}ch` : "5ch";

  return (
    <p
      className={classes.param + " " + props.className}
      ref={props.containerRef}
    >
      {props.prefix}{" "}
      <input
        type="text"
        className={classes.paramInput}
        value={value !== undefined ? inputValue : undefined}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={(event) => {
          props.onChange?.(event.target.value);
          props.onEnter?.(event.target.value);
        }}
        style={styleObj}
        ref={props.inputRef}
        disabled={props.disabled}
      />{" "}
      {props.suffix}
    </p>
  );
};

export default ParamInput;
