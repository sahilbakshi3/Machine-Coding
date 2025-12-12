import React from "react";

const Preview = ({ fileDetail, onRemove }) => {
  return (
    <div className="file-preview">
      <img
        className="thumbnail"
        src={URL.createObjectURL(fileDetail)}
        alt={fileDetail.name}
      />
      <div className="file-info">
        <span className="file-name">{fileDetail.name}</span>
        <span className="file-size">
          {(fileDetail.size / 1024).toFixed(2)}KB
        </span>
      </div>
      <button onClick={() => onRemove(fileDetail.name)} className="remove-btn">
        X
      </button>
    </div>
  );
};

export default Preview;
