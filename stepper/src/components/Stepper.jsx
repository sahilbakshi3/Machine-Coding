import React, { useState } from "react";

const Stepper = ({ steps }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleContinue = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="stepper">
      <div>
        {steps.map((item, index) => (
          <div key={item.label} className="stepper-container">
            <div
              className={`stepper-number ${
                index <= currentStep ? "active" : ""
              }`}
            >
              {index + 1}
              {index < steps.length - 1 && (
                <div
                  className={`stepper-line ${
                    index <= currentStep ? "active" : ""
                  }`}
                ></div>
              )}
            </div>
            <div className="stepper-label">{item.label}</div>
          </div>
        ))}
      </div>
      <div className="stepper-content">{steps[currentStep].content}</div>
      <div className="stepper-controls">
        <button
          disabled={currentStep === 0}
          className="back"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          disabled={currentStep === steps.length - 1}
          className="continue"
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Stepper;

//////////////////// REACT STEPPER NAVIGATION — CHEAT SHEET ////////////////////

// Goal:
// Multi-step UI where user can navigate steps forward or backward.
// Back button should be disabled at the first step.
// Continue button should be disabled at the last step.

// State:
// currentStep (0-based index) -> tells which step is active

// Navigation events:
// handleContinue():
//   If not on the last step -> move forward (currentStep + 1)
// handleBack():
//   If not on the first step -> move backward (currentStep - 1)

// Button disabling logic:
// Back button:
//   disabled when currentStep === 0  (already at the beginning)
//
// Continue button:
//   disabled when currentStep === steps.length - 1  (last step reached)

// Rendering:
// - Display numbered step indicators (index + 1)
// - Apply "active" styling to show progress
// - Show the current step’s content
// - Navigation controls update currentStep based on handlers + conditions

// Interview talking points:
// Shows conditional rendering and state-driven navigation
// Prevents invalid navigation using simple boundary guards
// Common UI pattern (checkout, onboarding, form wizard)

///////////////////////////////////////////////////////////////////////////////
