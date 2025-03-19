import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import "./directions.scss";
import science from "../../a/talim.jpg";
import technology from "../../a/it.png";
import eco from "../../a/eco.jpeg";

const Directions = () => {
  const { errors, setDirections, directions, background, setBackground } =
    useContext(AppContext);
  const direction = [
    {
      title: "Ta'lim yo'nalishi",
      image: science,
    },
    {
      title: "IT yo'nalishi",
      image: technology,
    },
    {
      title: "Yashil Iqtisodiyot yo'nalishi",
      image: eco,
    },
  ];
    const handleChange = (e) => {
      const name = e.target.value;
      setDirections(name);
    };
  // const handleChange = (title, image) => () => {
  //   setDirections(title); // Yo‘nalishni tanlash
  //   setBackground(image); // Orqa fonni o‘zgartirish
  // };
  return (
    <div className="input-col w-100">
      <label htmlFor="" id="t">
        Yo'nalishlarni tanlang
      </label>
      <select name="direction" value={directions || ""} onChange={handleChange}>
        <option value="" disabled>
          Yo'nalish tanlang *
        </option>
        {direction.map((d, index) => (
          <option value={d.title} key={index}>
            {d.title}
          </option>
        ))}
      </select>
      {/* <div className="cards">
        {direction.map((d, i) => (
          <div
            className={`card ${directions === d.title ? "active" : ""}`}
            key={i}
            onClick={handleChange(d.title, d.image)}
          >
            {d.title}
          </div>
        ))}
      </div> */}
      <span className="error">{errors.direction}</span>
    </div>
  );
};

export default Directions;
