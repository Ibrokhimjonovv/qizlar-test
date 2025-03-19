import React, { useContext } from "react";
import { AppContext } from "../../context";
import "./directions.scss";
import science from "../../a/talim.jpg";
import technology from "../../a/it.png";
import eco from "../../a/eco.jpeg";

const Directions = () => {
  const { errors, setDirections, directions, setActiveTab } =
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
    const selectedTitle = e.target.value;
    setDirections(selectedTitle);

    // Tanlangan yo'nalishga mos indeksni topish
    const selectedIndex = direction.findIndex((d) => d.title === selectedTitle);
    setActiveTab(selectedIndex); // activeTab ni yangilash
  };

  return (
    <div className="input-col w-100">
      <label htmlFor="" id="t">
        Startup loyiha yo'nalishini tanlang
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
      <span className="error">{errors.direction}</span>
    </div>
  );
};

export default Directions;