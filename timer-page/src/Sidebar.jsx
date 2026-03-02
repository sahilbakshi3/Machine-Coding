import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <Link to="/">Timer Page</Link>
      <Link to="/page2">Page 2</Link>
      <Link to="/page3">Page 3</Link>
    </div>
  );
}
