import React, { useState } from "react";

const FileExplorer = ({ folderData }) => {
  const [showChildren, setShowChildren] = useState(false);

  //   const handleClick = () => {
  //     setShowChildren(!showChildren);
  //   };

  return (
    <div className="container">
      <h5>
        {folderData.type === "folder" ? (showChildren ? "📂" : "📁") : "📄"}
        <span onClick={() => setShowChildren(!showChildren)}>
          {folderData.name}
        </span>
      </h5>
      {showChildren &&
        folderData?.children?.map((childrenData, index) => {
          return <FileExplorer key={index} folderData={childrenData} />;
        })}
    </div>
  );
};

export default FileExplorer;
