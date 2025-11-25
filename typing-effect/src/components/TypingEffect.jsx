import { useEffect, useRef, useState } from "react";

export default function TypingEffect({ text, delay }) {
  const [displayText, setDisplayText] = useState(text);
  const velocityRef = useRef({ speed: 1, endIndex: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (velocityRef.current.endIndex === text.length) {
        velocityRef.current.speed = -1;
      } else if (velocityRef.current.endIndex === 0) {
        velocityRef.current.speed = 1;
      }
      velocityRef.current.endIndex += velocityRef.current.speed;
      setDisplayText(text.slice(0, velocityRef.current.endIndex));
    }, delay);
    return () => {
      clearInterval(interval);
    };
  }, [delay, text]);

  return (
    <h1>
      {displayText}
      <span>|</span>
    </h1>
  );
}

/* -------------------------------------------------------------------
   TYPING EFFECT
   -------------------------------------------------------------------
   PURPOSE:
     Creates a looping typewriter animation:
     - Text types forward → reaches end → deletes backward → repeats.

   -------------------------------------------------------------------
   STATE + REFS:
     displayText   → what’s currently shown on screen
     velocityRef   → { speed, endIndex } stored in a ref
                     • speed: +1 for typing, -1 for deleting
                     • endIndex: how many characters to show

   -------------------------------------------------------------------
   MAIN LOGIC (useEffect):
     Runs an interval every `delay` ms.

     1. CHECK LIMITS
        - If endIndex reaches FULL length → switch to deleting (speed = -1)
        - If endIndex reaches 0         → switch to typing   (speed = +1)

     2. UPDATE endIndex
        endIndex += speed

     3. UPDATE displayText
        displayText = text.slice(0, endIndex)

     4. CLEANUP
        clearInterval on unmount or dependency change.

   -------------------------------------------------------------------
   DEPENDENCIES:
     [delay, text]
     - Rebuild interval if text changes or delay changes.

   -------------------------------------------------------------------
   RENDER:
     <h1>{displayText}<span>|</span></h1>
     - Shows typing text followed by a blinking cursor.

   -------------------------------------------------------------------
   FLOW SUMMARY:
     • Typing forward until full
     • Start deleting
     • Delete down to empty
     • Start typing again
     • Loops forever using interval + ref

------------------------------------------------------------------- */
