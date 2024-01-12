import { useEffect, useRef, useState } from "react";
import { useTimersContext, type Timer as TimerProps } from "../store/timers-context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer({ name, duration }: TimerProps) {
  // duration is the value which was inserted by a user
  const [remainingTime, setRemainingTime] = useState(duration * 1000);

  // refs won't be recreated whenever this component function runs again, and therefore
  // we can use refs instead of variables
  const interval = useRef<number | null>(null);

  const { isRunning } = useTimersContext();

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;
    // by putting setIterval hook inside useEffect we avoid creation of inf loop
    // because setInterval won't be called again when the component is being rendered because
    // prevState has been updated with the last call of setInterval function
    if (isRunning) {
      timer = setInterval(function () {
        setRemainingTime((prevState) => prevState - 50);
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    // inside we can return a function or nothing at all
    // the returned function is a cleanup function
    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
