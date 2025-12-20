import React, { useEffect, useState } from "react";

const CaptchaGenerator = () => {
  const [captcha, setCaptcha] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isVerified, setisVerified] = useState(false);
  const [message, setMessage] = useState("");

  const generateCaptcha = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    const allChars = uppercase + lowercase + numbers;

    let res = "";

    res += uppercase.charAt(Math.floor(Math.random() * uppercase.length));
    res += lowercase.charAt(Math.floor(Math.random() * lowercase.length));
    res += numbers.charAt(Math.floor(Math.random() * numbers.length));

    for (let i = 3; i < 6; i++) {
      res += allChars.charAt(Math.floor(Math.random * allChars.length));
    }

    res = res
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setCaptcha(res);
    setUserInput("");
    setisVerified(false);
  };

  const verifyCaptcha = () => {
    if (userInput === captcha) {
      setMessage("Verified Successfully");
      setisVerified(true);
    } else {
      setMessage("Incorrect CAPTCHA. Try Again");
      setisVerified(false);
      generateCaptcha();
    }
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div className="captcha-container">
      <div className="captcha-card">
        <h1 className="captcha-title">Captcha Verification</h1>
        <div className="captcha-display">
          <div className="captcha-text">{captcha}</div>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && verifyCaptcha()}
            type="text"
            placeholder="Enter Captcha"
            disabled={isVerified}
            className={`captcha-input ${isVerified ? "disabled" : ""}`}
          />
          <div className="btn-group">
            <button
              onClick={verifyCaptcha}
              disabled={isVerified || !userInput}
              className={`btn btn-verify ${isVerified ? "verified" : ""}`}
            >
              Verify
            </button>
            <button onClick={generateCaptcha} className="btn btn-refresh">
              Refresh
            </button>
          </div>
          {message && (
            <div className={`message ${isVerified ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptchaGenerator;
