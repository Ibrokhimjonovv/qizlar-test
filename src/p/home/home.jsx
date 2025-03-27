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
        <Images />
        <Signup />
    </div>
  )
}

export default Home