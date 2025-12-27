import "./App.css";
import { useState } from "react";
import { data } from "./data";

function App() {
  const [leftSide, setLeftSide] = useState(data);
  const [rightSide, setRightSide] = useState([]);

  const checkedItem = (list, id, checked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          checked: !checked,
        };
      }
      return item;
    });
  };

  const handleClick = (id, checked, direction) => {
    if (direction === "LEFT") {
      let copyList = [...leftSide];

      copyList = checkedItem(copyList, id, checked);
      setLeftSide(copyList);
    } else {
      let copyList = [...rightSide];

      copyList = checkedItem(copyList, id, checked);
      setRightSide(copyList);
    }
  };

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  };

  const handleTransfer = (direction) => {
    if (direction === "LEFT") {
      if (leftSide.length) {
        const copyList = [...leftSide];
        const checkList = copyList.filter((item) => item.checked);
        const unCheckList = copyList.filter((item) => !item.checked);

        setRightSide(resetItems([...rightSide, ...checkList]));
        setLeftSide(unCheckList);
      }
    } else {
      if (rightSide.length) {
        const copyList = [...rightSide];
        const checkList = copyList.filter((item) => item.checked);
        const unCheckList = copyList.filter((item) => !item.checked);

        setLeftSide(resetItems([...leftSide, ...checkList]));
        setRightSide(unCheckList);
      }
    }
  };

  return (
    <div className="App">
      <h1>Transfer List</h1>
      <div className="container">
        {/* left side box */}
        <div className="box">
          {leftSide.map(({ title, id, checked }) => (
            <div
              onClick={() => handleClick(id, checked, "LEFT")}
              className={`item ${checked && "check"}`}
              id={id}
              key={id}
            >
              {title}
            </div>
          ))}
        </div>
        {/* actions btns */}
        <div className="actions">
          <button onClick={() => handleTransfer("RIGHT")}>Left</button>
          <button onClick={() => handleTransfer("LEFT")}>Right</button>
        </div>
        {/* right side box */}
        <div className="box">
          {rightSide.map(({ title, id, checked }) => (
            <div
              className={`item ${checked && "check"}`}
              id={id}
              key={id}
              onClick={() => handleClick(id, checked, "RIGHT")}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
