import React, { useState } from "react";
import img1 from "../../a/qizlar_img_1.jpg";
import img2 from "../../a/qizlar_img_2.jpg";
import img3 from "../../a/qizlar_img_3.jpg";
import img4 from "../../a/qizlar_img_4.jpg";
import img5 from "../../a/qizlar_img_5.jpg";
import img6 from "../../a/qizlar_img_6.jpg";
import "./images.scss";

const Images = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };
  return (
    <div id="images">
      <div className="left">
        <img src={img1} alt="" onClick={() => openImage(img1)} />
        <img src={img2} alt="" onClick={() => openImage(img2)} />
        <img src={img3} alt="" onClick={() => openImage(img3)} />
      </div>
      <div className="right">
        <img src={img4} alt="" onClick={() => openImage(img4)} />
        <img src={img5} alt="" onClick={() => openImage(img5)} />
        <img src={img6} alt="" onClick={() => openImage(img6)} />
      </div>

        <div className={`modal ${selectedImage ? "active" : ""}`} onClick={closeImage}>
          <div className="modal-content">
            <img src={selectedImage} className={`${selectedImage ? "active" : ""}`} alt="" />
          </div>
        </div>
    </div>
  );
};

export default Images;
