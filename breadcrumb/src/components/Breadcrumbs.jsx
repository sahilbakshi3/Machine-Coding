import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  //   console.log(location);
  const pathnames = pathname.split("/").filter((x) => x);

  let breadCumbPath = "";

  //   console.log(pathnames);

  return (
    <div className="breadcrumbs">
      {pathnames.length > 0 && <Link to="/">Home</Link>}
      {pathnames.map((name, index) => {
        breadCumbPath += `/${name}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={breadCumbPath}>/ {name}</span>
        ) : (
          <span>
            /
            <Link key={breadCumbPath} to={breadCumbPath}>
              {name}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
