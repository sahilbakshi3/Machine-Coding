import React, { useRef, useState } from "react";

const ToastContainer = () => {
  const [toast, setToast] = useState([]);

  const timerRef = useRef({});

  const handleClose = (id) => {
    clearTimeout(timerRef.current[id]);
    delete timerRef.current[id];

    setToast((prevToast) => {
      const filteredArr = prevToast.filter((item) => {
        return item.id !== id;
      });
      return filteredArr;
    });
  };

  const handleAdd = (message, type) => {
    const id = new Date().getTime();
    const newToasts = [...toast, { id, message, type }];

    setToast(newToasts);

    timerRef.current[id] = setTimeout(() => handleClose(id), 5000);
  };

  return (
    <div className="container">
      <div className="toast-container">
        {toast.map(({ id, message, type }) => {
          return (
            <div key={id} className={`toast ${type}`}>
              {message} <span onClick={() => handleClose(id)}>X</span>
            </div>
          );
        })}
      </div>

      <div className="btn-container">
        <button onClick={() => handleAdd("Success", "success")}>
          Success Toast
        </button>
        <button onClick={() => handleAdd("Info", "info")}>Info Toast</button>
        <button onClick={() => handleAdd("Warning", "warning")}>
          Warning Toast
        </button>
        <button onClick={() => handleAdd("Error", "error")}>Error Toast</button>
      </div>
    </div>
  );
};

export default ToastContainer;
