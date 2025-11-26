import React from "react";
import useClickOutside from "../hooks/useClickOutside";

const Modal = ({ isOpen, closeModal }) => {
  useClickOutside(modalRef, handler);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-container">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button onClick={closeModal}>Close Modal</button>
    </div>
  );
};

export default Modal;
