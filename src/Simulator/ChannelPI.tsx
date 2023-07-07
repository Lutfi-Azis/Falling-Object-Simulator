import { FC, useEffect, useRef } from "react";
import Channel from "../types/Channel";
import ParamNumberInput from "./ParamNumberInput";
import { CommonProps } from "./ParamInput";

type Props = CommonProps & {
  name: string;
  suffix?: string;
  channel: Channel<number>;
  onChange?: (value: number) => void;
  onNotification?: (value: number) => void;
};

const ChannelPI: FC<Props> = ({
  name,
  suffix,
  channel,
  onChange,
  onNotification,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleNotification = (value: number) => {
      onNotification?.(value);
      if (Math.abs(value) < 0.01) value = 0;
      inputRef.current!.value = value.toFixed(1).toString();
    };

    handleNotification(channel.getLatest());
    channel.subscribe(handleNotification);

    return () => {
      channel.unsubscribe(handleNotification);
    };
  }, [channel, inputRef, onNotification]);

  return (
    <ParamNumberInput
      inputRef={inputRef}
      name={name}
      units={suffix}
      onChange={onChange}
      delayed={true}
      {...props}
    />
  );
};

export default ChannelPI;
