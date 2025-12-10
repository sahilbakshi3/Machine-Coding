import { useEffect, useRef, useState } from "react";

const CountdownTimer = () => {
  const [time, setTime] = useState({
    hour: "",
    minute: "",
    second: "",
  });

  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  const handleChange = (e, field) => {
    const value = parseInt(e.target.value) || 0;
    if (isNaN(value)) {
      return;
    }
    const copyTime = { ...time };
    copyTime[field] = value;
    copyTime.minute += Math.floor(copyTime.second / 60);
    copyTime.second = copyTime.second % 60;
    copyTime.hour += Math.floor(copyTime.minute / 60);
    copyTime.minute = copyTime.minute % 60;
    setTime(copyTime);
    console.log(e.target.value, field);
  };

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime({
      hour: "",
      minute: "",
      second: "",
    });
  };

  useEffect(() => {
    if (isRunning) {
      if (
        time.hour.length === 0 &&
        time.minute.length === 0 &&
        time.second.length === 0
      ) {
        return;
      }

      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          const copyPrev = { ...prev };
          copyPrev.second--;

          if (copyPrev.second < 0) {
            copyPrev.minute--;
            copyPrev.second = 59;
            if (copyPrev.minute < 0) {
              copyPrev.hour--;
              copyPrev.minute = 59;
              if (copyPrev.hour < 0) {
                clearInterval(intervalRef.current);
                return {
                  hour: "",
                  minute: "",
                  second: "",
                };
              }
            }
          }

          return copyPrev;
        });
      }, 1000);
      return () => clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  return (
    <div className="container">
      <div className="inputs">
        <input
          disabled={isRunning}
          value={time.hour}
          onChange={(e) => handleChange(e, "hour")}
          type="text"
          placeholder="HH"
        />
        :
        <input
          disabled={isRunning}
          value={time.minute}
          onChange={(e) => handleChange(e, "minute")}
          type="text"
          placeholder="MM"
        />
        :
        <input
          disabled={isRunning}
          value={time.second}
          onChange={(e) => handleChange(e, "second")}
          type="text"
          placeholder="SS"
        />
      </div>
      <div className="btn-container">
        <button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default CountdownTimer;

/* ------------------------------------------------------------------
   COUNTDOWN TIMER LOGIC — EXPLANATION CHEAT SHEET
   ------------------------------------------------------------------

   STATE:
     time → { hour, minute, second } (numbers stored as user input)
     isRunning → boolean (true when timer is ticking)
     intervalRef → reference to setInterval so we can stop it later

   ------------------------------------------------------------------
   INPUT HANDLING:
   handleChange(event, field)
     - Convert user value to integer
     - Normalize input:
         If seconds >= 60 → convert to minutes + remaining seconds
         If minutes >= 60 → convert to hours + remaining minutes
     - Update UI immediately as user types

     Example:
       User enters 120 seconds → becomes 2 minutes 0 seconds

   Inputs are disabled when timer is running (prevent cheating)

   ------------------------------------------------------------------
   START / PAUSE BUTTON:
   handleStart()
     - Toggles isRunning
     - If paused → timer stops via useEffect cleanup
     - If resumed → timer continues counting down

   Button text:
     "Start" → timer stopped
     "Pause" → timer running

   ------------------------------------------------------------------
   RESET:
   handleReset()
     - Stop timer (clearInterval)
     - Reset time back to empty input fields
     - Disable running state

   ------------------------------------------------------------------
   TIMER COUNTDOWN MECHANICS:
   useEffect(() => {...}, [isRunning])
     WHEN isRunning becomes true:
       - Start setInterval (runs every 1000ms)
       - Reduce second by 1
         If second < 0:
            second = 59
            minute--
            If minute < 0:
               minute = 59
               hour--
               If hour < 0:
                 → Timer finished → clearInterval + reset state

     WHEN isRunning becomes false:
       - Clear ongoing interval immediately (pause behavior)

   ------------------------------------------------------------------
   END CONDITION:
     When hours, minutes and seconds are all empty or timer goes negative:
       - Timer auto-stops
       - Reset UI

   ------------------------------------------------------------------
   TL;DR WORKFLOW:
       User sets time → Start → countdown every second → 
       values roll over properly (59 → previous -1) → 
       stops at zero and resets cleanly
   ------------------------------------------------------------------
*/
