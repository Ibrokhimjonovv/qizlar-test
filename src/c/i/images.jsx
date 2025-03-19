import React, { useContext, useState } from "react";
import img1 from "../../a/qizlar_img_1.jpg";
import img2 from "../../a/qizlar_img_2.jpg";
import img3 from "../../a/qizlar_img_3.jpg";
import img4 from "../../a/qizlar_img_4.jpg";
import img5 from "../../a/qizlar_img_5.jpg";
import img6 from "../../a/qizlar_img_6.jpg";
import "./images.scss";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";

const Images = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { slide, setSlide } = useContext(AppContext);

  const openImage = (img) => {
    setSelectedImage(img);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };
  return (
    <div id="images" className={`${slide ? "active" : ""}`}>
      <h1 id="title">RAQAMLI AVLOD QIZLARI</h1>
      <div className="df">
        <div className="image">
          {/* <img src={img1} alt="" onClick={() => openImage(img1)} /> */}
          <img src={img4} alt="" onClick={() => openImage(img4)} />
          <img src={img2} alt="" onClick={() => openImage(img2)} />
          <img src={img3} alt="" onClick={() => openImage(img3)} />
          <img src={img5} alt="" onClick={() => openImage(img5)} />
          {/* <img src={img6} alt="" onClick={() => openImage(img6)} />
        <img src={img6} alt="" onClick={() => openImage(img6)} />
        <img src={img6} alt="" onClick={() => openImage(img6)} />
        <img src={img6} alt="" onClick={() => openImage(img6)} /> */}
        </div>
        <div className="texts">
          <h1>Qizlar kelajagi – innovatsiyalar bilan yorqinroq!</h1>
          <h2>Qizlar uchun yangi imkoniyat!</h2>
          <p>
            G‘oyalaringizni startupga aylantiring va global sahnaga qadam
            qo‘ying! "Raqamli Avlod Qizlari" – ta’lim, IT va yashil iqtisodiyot
            sohalaridagi eng ilg‘or startuplarni aniqlashga qaratilgan tanlov.
            Loyihangizni taqdim eting, mutaxassislar bahosidan o‘ting va
            g‘oliblikka erishing! Eng yaxshi startuplarga – xalqaro ta’lim
            sayohati! Orzu qiling. Innovatsiya yarating. Imkoniyatni qo‘lga
            kiriting!
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
