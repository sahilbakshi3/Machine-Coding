import React, { useState } from "react";
import "./App.css";

const App = () => {
  const data = [
    {
      id: "name",
      label: "Name",
      inputType: "text",
      buttonName: "Next",
      placeholder: "Your Name...",
    },
    {
      id: "email",
      label: "Email",
      inputType: "email",
      buttonName: "Next",
      placeholder: "Your Email...",
    },
    {
      id: "dob",
      label: "DOB",
      inputType: "date",
      buttonName: "Next",
      placeholder: "",
    },
    {
      id: "password",
      label: "Password",
      inputType: "password",
      buttonName: "Submit",
      placeholder: "Your Password...",
    },
  ];

  const [forms, setForms] = useState(data);
  const [index, setIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    password: "",
  });

  const [formSubmitted, setFormIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (index === forms.length - 1) {
      setFormIsSubmitted(true);
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    setIndex((prev) => prev - 1);
  };

  const handleInputChange = (e) => {
    const id = e.target.id;
    const val = e.target.value;

    const copyFormData = { ...formData };
    copyFormData[id] = val;

    setFormData(copyFormData);
  };

  return (
    <div className="App">
      {!formSubmitted ? (
        <form className="container" onSubmit={handleSubmit}>
          {index > 0 && (
            <button href="/" onClick={handleBack}>
              Back
            </button>
          )}
          <label>{forms[index].label}</label>
          <input
            required
            value={formData[forms[index].id]}
            id={forms[index].id}
            onChange={handleInputChange}
            type={forms[index].inputType}
            placeholder={forms[index].placeholder}
          />
          <button>{forms[index].buttonName}</button>
        </form>
      ) : (
        <div className="message">
          <h1>Success !</h1>
          <hr />
          <span>Name : {formData.name}</span>
          <span>Email : {formData.email}</span>
          <span>Dob : {formData.dob}</span>
          <span>Password : {formData.password}</span>
        </div>
      )}
    </div>
  );
};

export default App;
