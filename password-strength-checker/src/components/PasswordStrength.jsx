import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordStrength = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const checkStrength = (pwd) => {
    const checks = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
    };

    const score = Object.values(checks).filter(Boolean).length;

    let strength = 0;
    let label = "";
    let strengthClass = "";

    if (score === 0) {
      strength = 0;
    } else if (score <= 2) {
      strength = 2;
      label = "Weak";
      strengthClass = "weak";
    } else if (score === 3) {
      strength = 3;
      label = "Fair";
      strengthClass = "fair";
    } else if (score === 4) {
      strength = 4;
      label = "Good";
      strengthClass = "good";
    } else {
      strength = 5;
      label = "Strong";
      strengthClass = "strong";
    }

    return { strength, label, strengthClass, checks };
  };

  const { strength, label, strengthClass, checks } = checkStrength(password);
  const passwordMatch =
    password && confirmPassword && password === confirmPassword;
  const passwordDontMatch =
    password && confirmPassword && password !== confirmPassword;

  const requirements = [
    { text: "At least 8 characters", met: checks.length },
    { text: "One uppercase letter (A-Z)", met: checks.uppercase },
    { text: "One lowercase letter (a-z)", met: checks.lowercase },
    { text: "One number (0-9)", met: checks.number },
    { text: "One special character (!@#$)", met: checks.special },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (strength >= 3 && passwordMatch) {
      alert("Account created Successfully");
    }
  };

  return (
    <div className="password-wrapper">
      <div className="password-container">
        <h1 className="password-heading">Password strength checker</h1>

        <div className="input-group">
          <label className="label">Password</label>
          <div className="input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password..."
              className={`password-input ${
                passwordMatch ? "match" : passwordDontMatch ? "no-match" : ""
              }`}
            />

            <button
              type="button"
              className="eye-button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {password && (
          <div className="strength-meter">
            <div className="strength-header">
              <span className="strength-label">Password Strength</span>
              <span className={`strength-value ${strengthClass}`}>{label}</span>
            </div>

            <div className="meter-container">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`meter-bar ${i <= strength ? strengthClass : ""}`}
                ></div>
              ))}
            </div>

            {/* Requirements */}
            <div className="requirements">
              {requirements.map((req, index) => (
                <div key={index} className="requirement">
                  <span className={`check-icon ${req.met ? "met" : ""}`}>
                    {req.met ? "✔" : ""}
                  </span>
                  <span className={`requirement-text ${req.met ? "met" : ""}`}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password */}

        <div className="input-group">
          <label className="label">Confirm Password</label>
          <div className="input-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your Password..."
              className="password-input"
            />

            <button
              type="button"
              className="eye-button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        <button
          className="submit-button"
          onClick={(e) => handleSubmit(e)}
          disabled={strength < 3 || !passwordMatch}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default PasswordStrength;
