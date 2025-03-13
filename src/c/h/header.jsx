import React from "react";
import "./header.scss";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div id="header">
      <div className="h-inner">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="document">
          {/* <Link to="">Nizom</Link> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
