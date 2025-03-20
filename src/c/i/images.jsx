import React, { useContext, useState, useEffect } from "react";
import img1 from "../../a/qizlar_img_1.jpg";
import img2 from "../../a/qizlar_img_2.jpg";
import img3 from "../../a/qizlar_img_3.jpg";
import img4 from "../../a/qizlar_img_4.jpg";
import img5 from "../../a/qizlar_img_5.jpg";
import img6 from "../../a/qizlar_img_6.jpg";
import "./images.scss";
import { AppContext } from "../../context";

const Images = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { slide, setSlide } = useContext(AppContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const images = [img4, img2, img3, img5]; // Rasm massivini yaratamiz

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setHoveredIndex(randomIndex);
    }, 1500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div id="images" className={`${slide ? "active" : ""}`}>
      <h1 id="title">Raqamli Avlod Qizlari startup loyihalar tanlovi!</h1>
      <div className="df">
        <div className="image">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              className={hoveredIndex === index ? "hovered" : ""}
              onClick={() => openImage(src)}
            />
          ))}
        </div>
        <div className="texts">
          <p>
            Raqamli Avlod Qizlari IT va boshqa sohalarda qizlarning o‘z
            o‘rnini topishiga, kelajagini qurishiga ko‘mak beruvchi startup
            tanlovi!
          </p>
          <button type="button" onClick={() => setSlide(true)}>
            Ro'yxatdan o'tish
          </button>
        </div>
      </div>

      <div
        className={`modal ${selectedImage ? "active" : ""}`}
        onClick={closeImage}
      >
        <div className="modal-content">
          <img
            src={selectedImage}
            className={`${selectedImage ? "active" : ""}`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
