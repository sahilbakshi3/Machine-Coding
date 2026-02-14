import { useState } from "react";
import TreeNode from "./components/TreeNode";
import { countNodes, maxDepth } from "./utils/jsonUtils";
import "./App.css";

const SAMPLE_JSON = `{
  "name": "Sahil Bakshi",
  "role": "Frontend Developer",
  "skills": ["React", "JavaScript", "CSS"],
  "experience": {
    "years": 3,
    "current": { "company": "TechCorp", "remote": true }
  }
}`;

export default function App() {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [collapseAll, setCollapseAll] = useState(false);
  const [treeKey, setTreeKey] = useState(0);

  // ─── Parse JSON safely ───────────────────
  let data = null;
  let error = null;

  try {
    if (input.trim()) data = JSON.parse(input);
  } catch (e) {
    error = e.message;
  }

  const nodes = data ? countNodes(data) : 0;
  const depth = data ? maxDepth(data) : 0;

  // ─── Toolbar actions ─────────────────────
  const format = () => setInput(JSON.stringify(JSON.parse(input), null, 2));
  const minify = () => setInput(JSON.stringify(JSON.parse(input)));
  const clear = () => setInput("");

  const expandAll = () => {
    setCollapseAll(false);
    setTreeKey((k) => k + 1); // force remount
  };

  const collapseAllNodes = () => {
    setCollapseAll(true);
    setTreeKey((k) => k + 1);
  };

  return (
    <div className="json-app">
      <div className="json-header">
        <div className="json-title">{"{ }"} JSON Visualizer</div>
        <div className="json-subtitle">Collapsible Tree Explorer</div>
      </div>

      <div className="json-main">
        {/* INPUT PANEL */}
        <div className="json-panel">
          <div className="panel-header">
            <span className="panel-label">JSON Input</span>
            {error && (
              <span className="panel-badge error-badge">Invalid JSON</span>
            )}
          </div>

          <textarea
            className="json-textarea"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* TREE PANEL */}
        <div className="json-panel">
          <div className="panel-header">
            <span className="panel-label">Tree View</span>
            {data && (
              <span className="panel-badge">
                {nodes} nodes · depth {depth}
              </span>
            )}
          </div>

          <div className="tree-panel">
            {error && <div className="error-box">Parse Error: {error}</div>}

            {data && (
              <TreeNode
                key={treeKey}
                value={data}
                defaultCollapsed={collapseAll}
              />
            )}
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="toolbar">
        <button className="tool-btn" onClick={format}>
          Format
        </button>
        <button className="tool-btn" onClick={minify}>
          Minify
        </button>
        <button className="tool-btn" onClick={clear}>
          Clear
        </button>
        <button className="tool-btn" onClick={expandAll}>
          Expand All
        </button>
        <button className="tool-btn" onClick={collapseAllNodes}>
          Collapse All
        </button>
      </div>
    </div>
  );
}
