import React, { useContext, useEffect, useState } from "react";
import "./newDirection.scss";
import { AppContext } from "../../context";
import img from "./img.webp"

const direction = [
  {
    title: "Ta'lim",
    image:
      "https://i.pinimg.com/736x/ab/07/39/ab07392d79619e94ab5a55a0759b58a1.jpg",
  },
  {
    title: "Sun'iy intellekt",
    image:
      "https://i.pinimg.com/736x/e1/4e/bd/e14ebd1396c089ca5d97d0e53a6cd3c5.jpg",
  },
  {
    title: "Iqlim o'zgarishi bilan bog'liq loyihalar",
    image:
      "https://i.pinimg.com/736x/45/d0/e5/45d0e51360fbcf846854516c2d29bb0a.jpg",
  },
  {
    title: "Yashil iqtisodiyot",
    image:
      img,
  },
];

const CircleSelector = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [fade, setFade] = useState(true);

  const { directions, setDirections } = useContext(AppContext);

  const handleClick = (tab) => {
    setFade(false);
    setActiveTab(tab);
    setDirections(direction[tab].title); // Yumaloq bosilganda directions ni yangilash
    setTimeout(() => {
      setFade(true);
    }, 300);
  };

  // directions o'zgarganda activeTab ni yangilash
  useEffect(() => {
    const selectedIndex = direction.findIndex((d) => d.title === directions);
    if (selectedIndex !== -1) {
      setActiveTab(selectedIndex);
    }
  }, [directions]);

  return (
    <div className="holderCircle1">
      <div className="circleCenter1">
        <div className="circleIcon">
          <svg viewBox="0 0 300 300">
            <circle id="holder" className="st0" cx={151} cy={151} r={140} />
          </svg>
        </div>
        <div
          className="dotCircle1"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          {direction.map((dir, index) => (
            <div
              key={index}
              className={`itemDot1 ${activeTab === index ? "active" : ""}`}
              data-tab={index}
              style={{
                right: getPosition(index).right,
                top: getPosition(index).top,
                transition: "1s",
              }}
              onClick={() => handleClick(index)}
            >
              <div className="item1">
                <div className="itemInner1">
                  <img src={dir.image} alt="image" className="icons1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="selectedText"
          style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s" }}
        >
          <h3>
            {direction[activeTab] ? (
              <p>
                <p id="f-s">START-UP</p>
                <p id="f-s-s">Loyiha</p>
                <p id="o-t">{direction[activeTab].title}</p>
              </p>
            ) : (
              "Startup loyiha yo'nalishlardan birini tanlang"
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

// To'g'ri pozitsiyalarni olish uchun indeksni tekshirish
const getPosition = (index) => {
  const positions = [
    { right: "260px", top: "0px" },
    { right: "90px", top: "8.5%" },
    { right: "-10px", top: "31%" },
    { right: "10px", top: "60%" },
  ];
  return positions[index] || { right: "0px", top: "0px" };
};

export default CircleSelector;
