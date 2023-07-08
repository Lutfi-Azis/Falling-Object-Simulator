import { FC, useState } from "react";
import ParamInput, { CommonProps } from "./ParamInput";

type Props = CommonProps & {
  name: string;
  value?: number;
  units?: string;
  onChange?: (value: number) => void;
};

const ParamNumberInput: FC<Props> = ({
  name,
  value,
  units,
  onChange,
  ...props
}) => {
  const [forcedDot, setForcedDot] = useState(false);

  let displayValue = value?.toString();
  if (forcedDot && displayValue) displayValue += ".";

  return (
    <ParamInput
      prefix={name + "="}
      value={displayValue}
      suffix={units}
      onChange={(value) => {
        if (value.length === 0) value = "0";
        setForcedDot(value[value.length - 1] === ".");
        if (value === ".") value = "0.";

        const isValid = /^-?\d*\.?\d*$/.test(value);
        if (isValid) onChange?.(parseFloat(value));
      }}
      inputMode="decimal"
      {...props}
    />
  );
};

export default ParamNumberInput;
