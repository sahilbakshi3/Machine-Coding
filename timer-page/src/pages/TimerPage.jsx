import { useEffect } from "react";

export default function TimerPage({ seconds, setIsActive }) {
  useEffect(() => {
    setIsActive(true); // start/resume timer

    return () => {
      setIsActive(false); // pause timer on leave
    };
  }, []);

  return (
    <div>
      <h2>Timer Page</h2>
      <p>Seconds: {seconds}</p>
    </div>
  );
}