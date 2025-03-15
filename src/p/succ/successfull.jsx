import React from 'react';
import check from "./check.png";
import { Link } from 'react-router-dom';
import "./successfull.scss";

const Successfull = () => {
  return (
    <div id='success'>
        <div className="card">
            <div className="top">
                <img src={check} alt="" />
                <p>Ajoyib!</p>
            </div>
            <div className="bottom">
                <p>Ro'yxatdan o'tish muvaffaqiyatli amalga oshirildi.</p>
                <Link to="/">Bosh sahifa</Link>
            </div>
        </div>
    </div>
  )
}

export default Successfull