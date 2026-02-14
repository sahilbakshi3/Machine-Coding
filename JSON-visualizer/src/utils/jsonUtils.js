// utils/jsonUtils.js

export const getType = (v) =>
  v === null ? "null" : Array.isArray(v) ? "array" : typeof v;

export const isExpandable = (v) => typeof v === "object" && v !== null;

export const getEntries = (v) =>
  Array.isArray(v) ? v.map((x, i) => [i, x]) : Object.entries(v);

// DFS — count all nodes in JSON tree
export const countNodes = (v) =>
  !isExpandable(v)
    ? 1
    : 1 + Object.values(v).reduce((s, x) => s + countNodes(x), 0);

// DFS — compute max depth
export const maxDepth = (v, d = 0) =>
  !isExpandable(v)
    ? d
    : Math.max(d, ...Object.values(v).map((x) => maxDepth(x, d + 1)));
