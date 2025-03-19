import React, { useContext } from "react";
import "./header.scss";
import logo from "../../../public/logo.png";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";

const Header = () => {
  const { setSlide, setBackground, setDirections } = useContext(AppContext)
  return (
    <div id="header">
      <div className="h-inner">
        <div className="logo">
          <Link
          to="#"
            onClick={(e) => {
              e.preventDefault();
              setSlide(false);
              setBackground("");
              setDirections(null);
            }}
          >
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="document">{/* <Link to="">Nizom</Link> */}</div>
      </div>
    </div>
  );
};

export default Header;
