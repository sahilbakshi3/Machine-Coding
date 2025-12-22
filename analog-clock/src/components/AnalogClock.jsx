import React, { useEffect, useState } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = hours * 30 + (minutes + 0.5);
  const minuteAngle = minutes * 6;
  const secondAngle = seconds * 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="clock">
        {/* Clock face markers */}
        {[...Array.from({ length: 12 })].map((_, i) => (
          <div
            key={i}
            className="marker"
            style={{ transform: `rotate(${i * 30}deg) translateY(-90px)` }}
          />
        ))}

        {/* Hour hand */}
        <div
          className="hand hour-hand"
          style={{ transform: `rotate(${hourAngle}deg)` }}
        />

        {/* Minute hand */}
        <div
          className="hand minute-hand"
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        />

        {/* Second hand */}
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${secondAngle}deg)` }}
        />

        {/* Center dot */}
        <div className="center" />
      </div>

      <div className="digital-time">{time.toLocaleTimeString()}</div>
    </div>
  );
};

export default AnalogClock;

/*
==========================
ANALOG CLOCK – LOGIC CHEATSHEET
==========================

1. STATE INITIALIZATION
----------------------
- useState(new Date()) stores the current system time.
- `time` will always represent the latest Date object.

const [time, setTime] = useState(new Date());


2. EXTRACT TIME PARTS
--------------------
- getHours(): returns 0–23 → converted to 12-hour format using % 12
- getMinutes(): returns 0–59
- getSeconds(): returns 0–59

const hours = time.getHours() % 12;
const minutes = time.getMinutes();
const seconds = time.getSeconds();


3. CALCULATE ROTATION ANGLES
---------------------------
Clock math (pure geometry, no magic):

- Hour hand:
  • Each hour = 30° (360° / 12)
  • Minutes slightly move the hour hand → smooth transition
  • Formula: hours * 30 + minutes * 0.5

- Minute hand:
  • Each minute = 6° (360° / 60)
  • Formula: minutes * 6

- Second hand:
  • Each second = 6° (360° / 60)
  • Formula: seconds * 6

const hourAngle = hours * 30 + minutes * 0.5;
const minuteAngle = minutes * 6;
const secondAngle = seconds * 6;


4. REAL-TIME UPDATE USING useEffect
----------------------------------
- setInterval runs every 1000ms (1 second)
- Updates time with new Date()
- Triggers re-render → recalculates angles → clock moves

useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);

  // Cleanup to avoid memory leaks when component unmounts
  return () => clearInterval(interval);
}, []);


5. CLOCK MARKERS (12 HOURS)
--------------------------
- Create an array of length 12
- Each marker is rotated by 30° increments
- translateY pushes the marker outward to form the clock face

[...Array(12)].map((_, i) => (
  <div
    className="marker"
    style={{
      transform: `rotate(${i * 30}deg) translateY(-90px)`
    }}
  />
));


6. HAND ROTATION (CSS TRANSFORM)
-------------------------------
- Each hand uses inline styles
- rotate(angle) visually moves the hand
- Angle values come from calculated logic above

Hour hand    → rotate(hourAngle)
Minute hand  → rotate(minuteAngle)
Second hand  → rotate(secondAngle)


7. CENTER DOT
-------------
- Purely cosmetic
- Covers hand pivots for a realistic clock look


8. DIGITAL TIME DISPLAY
----------------------
- time.toLocaleTimeString() converts Date → readable time
- Updates automatically every second with state change

<div className="digital-time">
  {time.toLocaleTimeString()}
</div>


==========================
KEY TAKEAWAYS
==========================
- Time = state
- Angles = derived state
- CSS transforms = animation
- setInterval + cleanup = live clock
- No canvas, no SVG, just math + CSS (clean & efficient)
*/
