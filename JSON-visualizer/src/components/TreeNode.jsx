import { useState } from "react";
import { isExpandable, getEntries } from "../utils/jsonUtils";

export default function TreeNode({
  label,
  value,
  depth = 0,
  defaultCollapsed,
}) {
  const expandable = isExpandable(value);
  const [collapsed, setCollapsed] = useState(depth > 1 || defaultCollapsed);

  // ─── Primitive value ─────────────────────
  if (!expandable) {
    return (
      <div className="tree-node">
        <div className="tree-row">
          <span className="toggle-spacer" />

          {label !== undefined && (
            <>
              <span className="node-key">"{label}"</span>
              <span className="node-colon">:</span>
            </>
          )}

          <span>{JSON.stringify(value)}</span>
        </div>
      </div>
    );
  }

  // ─── Object / Array ──────────────────────
  const entries = getEntries(value);
  const open = Array.isArray(value) ? "[" : "{";
  const close = Array.isArray(value) ? "]" : "}";

  return (
    <div className="tree-node">
      <div className="tree-row">
        <button
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="toggle"
        >
          {collapsed ? "▶" : "▼"}
        </button>

        {label !== undefined && (
          <>
            <span className="node-key">"{label}"</span>
            <span className="node-colon">:</span>
          </>
        )}

        <span className="node-bracket">{open}</span>
        <span className="node-count">{entries.length}</span>
      </div>

      {!collapsed && (
        <>
          <div className="tree-children">
            {entries.map(([k, v]) => (
              <TreeNode
                key={k}
                label={Array.isArray(value) ? undefined : k}
                value={v}
                depth={depth + 1}
                defaultCollapsed={defaultCollapsed}
              />
            ))}
          </div>
          <div className="closing-bracket">{close}</div>
        </>
      )}
    </div>
  );
}
