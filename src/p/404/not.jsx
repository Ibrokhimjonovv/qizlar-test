import React from 'react';
import { Link } from 'react-router-dom';
import "./not.scss";

const Not = () => {
  return (
    <div id='not'>
        <h1>404 <span>Sahifa topilmadi</span></h1>
        <div className="to-back">
            <Link to="/">Bosh sahifa</Link>
        </div>
    </div>
  )
}

export default Not