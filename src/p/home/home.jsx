import React, { useContext } from 'react'
import Wheel from '../../c/w/wheel';
import "./home.scss";
import { Link } from 'react-router-dom';
import t from "./photo_2025-03-13_21-26-27.jpg"
import Images from '../../c/i/images';
import Signup from '../s/signup';
import { AppContext } from '../../context';

const Home = () => {
  const { slide, background, isChecked } = useContext(AppContext);

  return (
    <div id='home' className={`hom ${isChecked ? "active" : ""}`}>
        {/* {
          slide && background && <img id='bg' src={background} alt="" />
        } */}
        {/* <h1>Raqamli avlod qizlari tanlovida ishtirok eting</h1>
        <h2>Ta'lim, IT va Yashil Iqtisodiyot yo'nalishlaridagi startuplar uchun imkoniyat!</h2> */}
        <Images />
        <Signup />
        {/* <Wheel /> */}
        {/* <div className="start-btn">
            <Link to="/signup">Tanlovda ishtirok etishni boshlash</Link>
        </div> */}
    </div>
  )
}

export default Home