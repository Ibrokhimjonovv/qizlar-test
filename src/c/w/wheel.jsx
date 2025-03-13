import React, { useState } from "react";
import "./wheel.scss";

const Wheel = () => {
  const [degree, setDegree] = useState(0);
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

  const spinWheel = () => {
    if (!spinning) {
      setSpinning(true);
      const extraSpin = 1800 + Math.floor(Math.random() * 360);
      const newDegree = degree + extraSpin;

      setDegree(newDegree);

      setTimeout(() => {
        setSpinning(false);

        // **Markazga to‘g‘ri kelgan segmentni aniqlash**
        const normalizedDegree = (430 - (newDegree % 360)) % 360;
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
          {segments.map((text, index) => {
            const previousIndex =
              (selectedIndex - 1 + segments.length) % segments.length; // Oldingi segmentni topish

            return (
              <div
                key={index}
                className="segment"
                style={{
                  transform: `rotate(${index * segmentAngle}deg)`,
                  backgroundImage: `url(${flagUrls[text]})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  zIndex:
                    selectedIndex !== null && index === previousIndex ? 3 : 1,
                }}
              >
                <span className="segment-text">{text}</span>
              </div>
            );
          })}
        </div>
        <button onClick={spinWheel} disabled={spinning} id="spin-btn">
          <span>Bosing</span>
          <div className="triangle"></div>
        </button>

        {/* Tanlangan segmentni pastda ko'rsatish */}
      </div>
      {selectedIndex !== null && (
        <div className="result">Qoyil agar tanlovda g'olib bo'lsangiz <span>{segments[selectedIndex]}</span>ga sayohat chiptasini yutib olishingiz mumkun!</div>
      )}
    </>
  );
};

export default Wheel;
