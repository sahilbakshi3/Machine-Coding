import React from "react";
import { useState } from "react";

const App = () => {
  const [list1, setList1] = useState([
    { title: "Item 1", checked: false },
    { title: "Item 2", checked: false },
    { title: "Item 3", checked: false },
  ]);

  const [list2, setList2] = useState([
    { title: "Item A", checked: false },
    { title: "Item B", checked: false },
    { title: "Item C", checked: false },
  ]);

  const handleCheck = (index) => {
    const updatedList1 = [...list1];
    updatedList1[index].checked = !updatedList1[index].checked;
    setList1(updatedList1);
  };

  const handleSwap = () => {
    const updatedList1 = [...list1];
    const updatedList2 = [...list2];
    updatedList1.forEach((item, index) => {
      if (item.checked) {
        const temp = updatedList1[index].title;
        updatedList1[index].title = updatedList2[index].title;
        updatedList2[index].title = temp;
      }
      updatedList1[index].checked = false;
    });
    setList1(updatedList1);
    setList2(updatedList2);
  };
  return (
    <div>
      <div>
        <h3>List1</h3>
        <ul>
          {list1.map((item, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(index)}
              />
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>List2</h3>
        <ul>
          {list2.map((item, index) => (
            <li key={index}>{item.title}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSwap}>Swap</button>
    </div>
  );
};

export default App;
