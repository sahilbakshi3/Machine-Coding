import "./App.css";
import Widget from "./components/Widget";

const App = () => {
  return (
    <div
      style={{
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Widget />
    </div>
  );
};

export default App;
