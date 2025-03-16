import React, { useState, useEffect } from "react";
import "./wheel.scss";

const Wheel = () => {
  const [degree, setDegree] = useState(0);
  const [speed, setSpeed] = useState(0.5); // Aylanish tezligi (past bo'lsa sekinroq)
  const [spinning, setSpinning] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const segments = ["AQSH", "BAA", "Xitoy", "Finlandiya", "Janubiy Koreya"];
  const flagUrls = {
    AQSH: "https://flagcdn.com/w320/us.png",
    BAA: "https://flagcdn.com/w320/ae.png",
    Xitoy: "https://flagcdn.com/w320/cn.png",
    Finlandiya: "https://flagcdn.com/w320/fi.png",
    "Janubiy Koreya": "https://flagcdn.com/w320/kr.png",
  };

  const segmentAngle = 360 / segments.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setDegree((prev) => prev + speed);
    }, 16); // Har 16ms da (taxminan 60FPS) aylantiramiz

    return () => clearInterval(interval);
  }, [speed]);

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      setSpeed(10); // Bosilganda tez aylanadi

      setTimeout(() => {
        setSpeed(0.5); // 5 sekunddan keyin yana sekin aylana boshlaydi
        setSpinning(false);

        // **Markazga to‘g‘ri kelgan segmentni aniqlash**
        const normalizedDegree = (430 - (degree % 360)) % 360;
        const newIndex =
          Math.floor(normalizedDegree / segmentAngle) % segments.length;

        setSelectedIndex(newIndex);
      }, 5000);
    }
  };

  return (
    <>
      <div className="wheel-container">
        <div className="wheel" style={{ transform: `rotate(${degree}deg)` }}>
          {segments.map((text, index) => (
            <div
              key={index}
              className="segment"
              style={{
                transform: `rotate(${index * segmentAngle}deg)`,
                backgroundImage: `url(${flagUrls[text]})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
              }}
            >
              <span className="segment-text">{text}</span>
            </div>
          ))}
        </div>
        <button id="spin-btn">
          <span></span>
          <div className="triangle"></div>
        </button>
      </div>
      {selectedIndex !== null && (
        <div className="result">
          Qoyil agar tanlovda g'olib bo'lsangiz{" "}
          <span>{segments[selectedIndex]}</span>ga sayohat chiptasini yutib
          olishingiz mumkun!
        </div>
      )}
    </>
  );
};

export default Wheel;
