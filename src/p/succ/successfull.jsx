import React from 'react';
import check from "./check.png";
import { Link } from 'react-router-dom';
import "./successfull.scss";

// Images
import insta from "./social.png";
import face from "./communication.png";
import tele from "./telegram.png"

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
          <a href="/">Bosh sahifa</a>
        </div>
      </div>
      <div className="contact">
        <h2>Murojat uchun</h2>
        <ul>
          <li>
            <Link to="https://facebook.com/digitalgeneration.uz" target="_blank"><img src={face} alt="" /> Facebook</Link>
          </li>
          <li>
            <Link to="https://instagram.com/dguzbekistan" target="_blank"><img src={insta} alt="" /> Instagram</Link>
          </li>
        </ul>
        <h2>Natijalar shu yerda e'lon qilinadi.</h2>
        <ul className='sec'>
          <li>
            <Link to="https://t.me/digitalgeneration_uz" target="_blank"><img src={tele} alt="" /> Telegram</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Successfull