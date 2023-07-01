import { FC } from "react";
import ParamInput, { CommonProps } from "./ParamInput";

type props = CommonProps & {
  name: string;
  value?: number;
  units: string;
  onChange?: (value: number) => void;
};

const ParamNumberInput: FC<props> = ({
  name,
  value = 0,
  units,
  onChange,
  ...props
}) => {
  return (
    <ParamInput
      prefix={name + "="}
      value={value?.toString()}
      suffix={units}
      onChange={(value) => {
        if (value.length === 0) value = "0";
        const isValid = /^-?\d+$/.test(value);
        if (isValid) onChange?.(parseInt(value));
      }}
      {...props}
    />
  );
};

export default ParamNumberInput;
