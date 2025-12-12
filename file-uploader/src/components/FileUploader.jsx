import React, { useState } from "react";
import Preview from "./Preview";

const FileUploader = () => {
  const [files, setFiles] = useState([]);

  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const selectedFiles = e.target.files;
    // console.log(selectedFiles);

    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (fileName) => {
    const filteredFile = files.filter((file) => file.name !== fileName);
    setFiles(filteredFile);
  };

  const handleDragEnter = (e) => {
    // console.log(e);

    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handledrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files;

    setFiles([...files, ...droppedFile]);
  };

  return (
    <div className="file-uploader">
      {/* Drag and drop zone */}
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handledrop}
        className={`dropzone ${isDragging ? "dragging" : ""}`}
      >
        <p>Drag and Drop Files Here</p>
        <input
          onChange={(e) => handleChange(e)}
          type="file"
          multiple
          className="hidden-input"
          id="file-input"
        />
        <label className="browse-btn" htmlFor="file-input">
          Browse Files
        </label>
      </div>
      {/* Preview Zone */}
      <div className="preview-container">
        {files.map((file) => {
          return (
            <Preview key={file.name} fileDetail={file} onRemove={removeFile} />
          );
        })}
      </div>
    </div>
  );
};

export default FileUploader;
