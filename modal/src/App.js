import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

const App = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <div>
      <Modal isOpen={showModal} closeModal={() => setShowModal(false)} />
    </div>
  );
};

export default App;
