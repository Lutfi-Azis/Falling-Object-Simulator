import { FC } from "react";
import ParamInput from "./ParamInput";

type props = {
  name: string;
  value?: number;
  units: string;
  onChange?: (value: number) => void;
  className?: string;
};

const ParamNumberInput: FC<props> = (props) => {
  return (
    <ParamInput
      prefix={props.name + "="}
      value={props.value?.toString()}
      suffix={props.units}
      className={props.className}
      onChange={(value) => {
        if (value.length === 0) value = "0";
        const isValid = /^-?\d+$/.test(value);
        if (isValid) props.onChange?.(parseInt(value));
      }}
    />
  );
};

export default ParamNumberInput;
