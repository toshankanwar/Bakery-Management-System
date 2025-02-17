import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../components/css/Breadcrumbs.css"; // Add styles if needed

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const pathTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <span key={index}>
            {" > "}
            <Link to={pathTo}>{value.charAt(0).toUpperCase() + value.slice(1)}</Link>
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
