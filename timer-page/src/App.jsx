import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import TimerPage from "./pages/TimerPage";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <TimerPage seconds={seconds} setIsActive={setIsActive} />
              }
            />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
