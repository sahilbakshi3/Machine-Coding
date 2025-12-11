import React from "react";
import VirtualizedList from "./components/VirtualizedList";

const App = () => {
  const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

  return (
    <div>
      <VirtualizedList list={LIST} height={400} width={300} itemHeight={35} />
    </div>
  );
};

export default App;
