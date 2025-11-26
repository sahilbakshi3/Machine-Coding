import React, { useEffect, useRef, useState } from "react";

const Otp = ({ otpLength = 6 }) => {
  const [otpFields, steOtpFields] = useState(new Array(otpLength).fill(""));

  const ref = useRef([]);

  const handleKeyDown = (e, index) => {
    const key = e.key;
    const copyOtpFields = [...otpFields];

    if (key === "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }

    if (key === "ArrowRight") {
      if (index + 1 < otpFields.length) {
        ref.current[index + 1].focus();
      }
      return;
    }

    if (key === "Backspace") {
      copyOtpFields[index] = "";
      steOtpFields(copyOtpFields);
      if (index > 0) {
        ref.current[index - 1].focus();
      }
      return;
    }

    if (isNaN(key)) {
      return;
    }
    copyOtpFields[index] = key;
    if (index + 1 < otpFields.length) {
      ref.current[index + 1].focus();
    }
    steOtpFields(copyOtpFields);
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").split("");

    if (digits.length === 0) {
      return;
    }

    const updatedOtp = [...otpFields];

    let i = index;
    let d = 0;

    while (i < otpLength && d < digits.length) {
      updatedOtp[i] = digits[d];
      i++;
      d++;
    }
    steOtpFields(updatedOtp);

    const lastFilledIndex = Math.min(index + digits.length - 1, otpLength - 1);
    ref.current[lastFilledIndex]?.focus();
  };

  useEffect(() => {
    ref.current["0"].focus();
  }, []);

  return (
    <div className="container">
      {otpFields.map((value, index) => {
        return (
          <input
            value={value}
            ref={(currentInput) => (ref.current[index] = currentInput)}
            type="text"
            key={index}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            maxLength={1}
          />
        );
      })}
    </div>
  );
};

export default Otp;

/* -------------------------------------------------------------------
   OTP COMPONENT
   -------------------------------------------------------------------
   GOAL:
     Multi-input OTP field with:
       - Fixed length (default = 6)
       - Keyboard navigation (arrows, backspace)
       - Only digit input
       - Paste support (fill multiple boxes at once)
       - Auto focus on first input

   -------------------------------------------------------------------
   STATE + REFS:
     otpFields (state):
       - Array of length = otpLength
       - Initialized as ["", "", "", "", "", ...]
       - Each index = one OTP box value

     ref (useRef):
       - ref.current = array of input DOM nodes
       - Used to manually move focus between inputs

   -------------------------------------------------------------------
   KEYBOARD HANDLER (handleKeyDown):
     const handleKeyDown = (e, index) => { ... }

     key = e.key
     copyOtpFields = shallow copy of otpFields

     1) LEFT ARROW ("ArrowLeft"):
        - If not at first index:
            focus previous input  → ref.current[index - 1].focus()
        - Return (do nothing else)

     2) RIGHT ARROW ("ArrowRight"):
        - If not at last index:
            focus next input → ref.current[index + 1].focus()
        - Return

     3) BACKSPACE:
        - Clear current box:
            copyOtpFields[index] = ""
            steOtpFields(copyOtpFields)
        - If not at first index:
            move focus to previous input
        - Return

     4) NON-NUMERIC GUARD:
        - if (isNaN(key)) return;
        - Blocks letters, symbols, etc.

     5) VALID DIGIT:
        - Set current box to pressed digit:
            copyOtpFields[index] = key
        - If not last index:
            move focus to next input
        - Update state:
            steOtpFields(copyOtpFields)

   -------------------------------------------------------------------
   PASTE HANDLER (handlePaste):
     const handlePaste = (e, index) => { ... }

     1) Prevent default paste behavior:
        e.preventDefault()

     2) Read clipboard text:
        pastedData = e.clipboardData.getData("text")

     3) Extract digits only:
        digits = pastedData
                  .replace(/\D/g, "")  // remove non-digits
                  .split("")           // array of characters

        - If no digits → return

     4) Prepare a copy of current OTP:
        updatedOtp = [...otpFields]

     5) Fill from current index forward:
        i = index          // current OTP box index
        d = 0              // current digit index

        while (i < otpLength && d < digits.length):
          updatedOtp[i] = digits[d]
          i++
          d++

     6) Update state:
        steOtpFields(updatedOtp)

     7) Move focus to last filled input:
        lastFilledIndex = min(index + digits.length - 1, otpLength - 1)
        ref.current[lastFilledIndex]?.focus()

   -------------------------------------------------------------------
   INITIAL FOCUS (useEffect):
     useEffect(() => {
       ref.current["0"].focus();
     }, []);

     - Runs once on mount
     - Focuses first OTP input to improve UX

   -------------------------------------------------------------------
   RENDER:
     return (
       <div className="container">
         {otpFields.map((value, index) => (
           <input
             key={index}
             type="text"
             value={value}
             ref={(currentInput) => (ref.current[index] = currentInput)}
             onKeyDown={(e) => handleKeyDown(e, index)}
             onPaste={(e) => handlePaste(e, index)}
             maxLength={1}      // each box = 1 char only
           />
         ))}
       </div>
     );

     - Each OTP box:
         - Bound to otpFields[index]
         - Connected to ref.current[index]
         - Handles:
             - keydown for navigation + typing
             - paste for multi-digit filling
         - maxLength ensures only 1 visible character

   -------------------------------------------------------------------
   FLOW SUMMARY:
     - Component mounts → first input auto-focused
     - User types a digit → box filled → auto-focus next
     - Backspace → clear current → move left
     - Arrow keys → horizontal navigation
     - Paste (e.g. "123456") in any box:
         fills sequential inputs starting from that box
         focuses the last filled box

   -------------------------------------------------------------------
   POTENTIAL IMPROVEMENTS:
     ✓ Combine otpFields into final OTP string via join("")
     ✓ Add onChange callback to parent (onOtpChange)
     ✓ Show error state / styling for invalid OTP
     ✓ Automatically submit when all digits are filled

------------------------------------------------------------------- */

