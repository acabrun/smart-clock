import { useEffect, useState } from "react";
import { formatSeconds } from "../utils/time";

type Props = {
  timeLeft: number;
  name: string;
};

const updateCountEveryXMS = 1000;

export const CountDown = ({ timeLeft, name }: Props) => {
  const [count, setCount] = useState(timeLeft / updateCountEveryXMS);
  const [friendlyTime, setFriendlyTime] = useState("");
  const isTimeUp = count <= 3600;

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, updateCountEveryXMS);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (isTimeUp) {
      setFriendlyTime("");
    } else setFriendlyTime(formatSeconds(count));
  }, [count]);

  const text = `${name} ${
    isTimeUp ? "is done!" : "will ring in"
  } ${friendlyTime}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          color: "white",
        }}
      >
        {text}
      </div>
    </div>
  );
};
