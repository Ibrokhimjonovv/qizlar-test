import React from 'react'
import Wheel from '../../c/w/wheel';
import "./home.scss";
import { Link } from 'react-router-dom';
import t from "./photo_2025-03-13_21-26-27.jpg"

const Home = () => {
  return (
    <div id='home'>
        <h1>Raqamli avlod qizlari tanlovida ishtirok eting</h1>
        <h2>Va quidagi sayohatlardan biriga ega bo'ling</h2>
        <Wheel />
        <div className="start-btn">
            <Link to="/signup">Tanlovda ishtirok etishni boshlash</Link>
        </div>

        {/* <img src={t} alt="" /> */}
    </div>
  )
}

export default Home