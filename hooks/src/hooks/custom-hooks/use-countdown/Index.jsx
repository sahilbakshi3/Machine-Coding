import { useState, useEffect, useCallback } from "react";

const useCountdown = (initialSeconds) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || seconds <= 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, seconds]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  return { seconds, isRunning, start, pause, reset };
};

export default useCountdown;

/* ------------------------------------------------------------------
   CUSTOM HOOK: useCountdown
   ------------------------------------------------------------------

   GOAL:
   - Countdown timer with start, pause, reset controls
   - Stops automatically when it reaches 0

   ------------------------------------------------------------------
   USAGE:
   const { seconds, isRunning, start, pause, reset } = useCountdown(60)

   ------------------------------------------------------------------
   STATE:
   seconds   → remaining time
   isRunning → whether timer is ticking

   ------------------------------------------------------------------
   HOW IT WORKS:
   - setInterval ticks every 1000ms when isRunning = true
   - Effect cleanup clears interval when paused or on unmount
   - seconds <= 0 guard stops the interval naturally

   ------------------------------------------------------------------
   CONTROLS:
   start() → begins countdown
   pause() → freezes at current seconds
   reset() → stops and restores initialSeconds

   ------------------------------------------------------------------
*/
