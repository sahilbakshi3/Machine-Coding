import React, { useRef } from "react";
import "./TextEditor.css";

const TextEditor = () => {
  const editorRef = useRef(null);

  const format = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => format("Bold")}>B</button>
        <button onClick={() => format("Underline")}>U</button>
        <button onClick={() => format("Italic")}>I</button>
      </div>
      <div
        className="editor"
        contentEditable
        placeholder="Start Typing..."
        ref={editorRef}
      ></div>
    </div>
  );
};

export default TextEditor;
