import React, { useRef, useState } from "react";

const DragAndDrop = ({ initialState }) => {
  const [data, setData] = useState(initialState);

  const dragItem = useRef();
  const dragContainer = useRef();

  const handleDragStart = (e, item, container) => {
    dragItem.current = item;
    dragContainer.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetContainer) => {
    const item = dragItem.current;
    const sourceContainer = dragContainer.current;
    setData((prev) => {
      const newData = { ...prev };
      newData[sourceContainer] = newData[sourceContainer].filter(
        (i) => i !== item
      );
      newData[targetContainer] = [...newData[targetContainer], item];
      return newData;
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      {Object.keys(data).map((container, index) => {
        return (
          <div
            key={index}
            onDrop={(e) => handleDrop(e, container)}
            onDragOver={handleDragOver}
            style={{
              background: "#f0f0f0",
              padding: "1rem",
              width: 250,
              minHeight: 300,
            }}
          >
            <h2>{container}</h2>
            {data[container].map((item, idx) => {
              return (
                <div
                  key={idx}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item, container)}
                  onDragEnd={handleDragEnd}
                  style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    backgroundColor: "white",
                    cursor: "move",
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default DragAndDrop;

/* -------------------------------------------------------------------
   DRAG & DROP COMPONENT
   -------------------------------------------------------------------
   GOAL:
     - Drag items between containers (Kanban-style)
     - Visual UI updates instantly
     - Uses HTML5 drag events + React state

   -------------------------------------------------------------------
   STATE & REFS:
     data (state):
       - Object with container keys:
           {
             Todo: ["Task1", "Task2"],
             Doing: ["Task3"],
             Done: []
           }
       - When item moves → update state immutably

     dragItem (ref):
       - Stores currently dragged item value
       - Example: "Task2"

     dragContainer (ref):
       - Stores name of container from which item started dragging
       - Example: "Todo"

   -------------------------------------------------------------------
   DRAG EVENT HANDLERS:

   1) DRAG START
      handleDragStart(e, item, container)
      - Save dragged item + its original container
      - Add visual feedback (transparent item)

      dragItem.current = item
      dragContainer.current = container
      e.target.style.opacity = "0.5"

   2) DRAG END
      handleDragEnd(e)
      - Remove opacity effect

      e.target.style.opacity = "1"

   3) DRAG OVER
      handleDragOver(e)
      - MUST call preventDefault()
      - Allows drop action on container

      e.preventDefault()

   4) DROP EVENT
      handleDrop(e, targetContainer)
      - Move item from source → destination container
      - Update state immutably

      const item = dragItem.current
      const source = dragContainer.current

      newData[source] = remove item from old list
      newData[targetContainer] = add item to new list

      setData(newData)

   -------------------------------------------------------------------
   RENDER UI:
     Loop over each container in state:
       <div onDrop ... onDragOver ...>

       Inside each container:
         Map items to draggable <div>
           draggable={true}
           onDragStart + onDragEnd styles applied

     CSS ensures each item:
       - Visible block
       - Movable cursor
       - Looks like draggable cards

   -------------------------------------------------------------------
   FLOW SUMMARY:
     User picks item → dragStart stores reference
     Drag over container → allowed via preventDefault
     Drop → item removed from old container + added to new one
     UI rerenders with updated state

   -------------------------------------------------------------------
   PRO TIPS (IMPROVEMENTS):
     ✓ Prevent dropping same item into same container
     ✓ Highlight container while dragging over
     ✓ Smooth animations (Framer Motion)
     ✓ Validation rules (cannot drop into “Done” directly)
     ✓ Keyboard-accessible drag alternatives for accessibility

------------------------------------------------------------------- */
