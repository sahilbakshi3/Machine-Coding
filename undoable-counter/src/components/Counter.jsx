import React, { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [undoCnt, setUndoCnt] = useState(0);

  const maintainHistory = (key, prev, curr) => {
    // console.log(key, prev, curr);

    const obj = {
      action: key,
      prev,
      curr,
    };

    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const handleClick = (key) => {
    // console.log(key);

    const val = parseInt(key);
    maintainHistory(key, value, val + value);
    setValue((prev) => prev + val);
  };

  const handleUndo = () => {
    if (history.length) {
      if (undoCnt + 1 > 5) {
        alert("You cannot undo more than 5 times");
        return;
      }

      const copyHistory = [...history];
      const firstItem = copyHistory.shift();
      setHistory(copyHistory);

      setValue(firstItem.prev);

      const copyRedoList = [...redoList];
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList);
    }
  };

  const handleRedo = () => {
    if (redoList.length) {
      const copyRedoList = [...redoList];
      const poppedvalue = copyRedoList.pop();

      setRedoList(copyRedoList);

      const { action, prev, curr } = poppedvalue;
      setValue(curr);

      maintainHistory(action, prev, curr);
    }
  };

  return (
    <div className="App">
      <h1>Undoable Counter</h1>
      <div className="action-btn">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
      </div>

      <div className="user-actions">
        {[-100, -10, -1].map((item, index) => {
          return (
            <button key={index} onClick={() => handleClick(item)}>
              {item}
            </button>
          );
        })}
        <div style={{ fontSize: 40 }}>{value}</div>
        {["+1", "+10", "+100"].map((item, index) => {
          return (
            <button key={index} onClick={() => handleClick(item)}>
              {item}
            </button>
          );
        })}
      </div>

      <div className="history">
        {history.map((item, index) => {
          return (
            <div className="row" key={index}>
              <div>{item.action}</div>
              <div>{`[${item.prev} -> ${item.curr}]`}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Counter;
