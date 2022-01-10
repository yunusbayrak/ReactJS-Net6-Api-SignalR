import logo from "../logo.svg";
import React from "react";
import { useLocation } from "react-router";
import { Link, Outlet } from "react-router-dom";

export function getCurrentUrl(location) {
  return location.pathname.split(/[?#]/)[0];
}

export function checkIsActive(location, url) {
  const current = getCurrentUrl(location);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }
  return false;
}

export default function Layout() {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url) ? `nav-link active ` : "nav-link";
  };
  const menu = [
    {
      id: 1,
      name: "Home",
      path: "/home",
    },
    {
      id: 2,
      name: "Dashboard",
      path: "/dashboard",
    },
  ];
  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
        >
          <img
            src={logo}
            className="bi me-2"
            width="40"
            height="32"
            alt="logo"
          />
          <span className="fs-4">ÜNLÜ&Co Sample React App</span>
        </a>

        <ul className="nav nav-pills">
          {menu.map((item) => (
            <li key={item.id} className="nav-item">
              <Link to={item.path} className={getMenuItemActive(item.path)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </header>
      <Outlet />
    </div>
  );
}
