import React, { useState, forwardRef, useContext } from "react";
import "./signup.scss";
import InputMask from "react-input-mask";
import Regions from "../../c/r/regions";
import { AppContext } from "../../context";
import FileInput from "../../c/f/fileInput";
import Offert from "../../c/o/offert";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { selectedDistrict, selectedRegion, errors, setErrors, isCheck, setSuccess } =
    useContext(AppContext);
    const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    surename: "",
    middle_name: "",
    phone_number: "",
    b_day: "",
    tg_username: "",
    email: "",
    place_of_study: "",
    direction: "",
    file: null,
    province: selectedRegion,
    district: selectedDistrict,
    about: "",
  });

  const [fileName, setFileName] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "filee") {
      const file = files[0];
      if (!file) {
        console.error("Fayl tanlanmagan yoki bo‘sh!");
        return;
      }
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
      setFileName(file.name);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const validateDate = (date) => {
    const regex = /^(\d{2})\.(\d{2})\.(\d{4})$/;
    const match = date.match(regex);
    if (!match) return "Sana formati noto‘g‘ri! DD.MM.YYYY kiriting.";
    let [_, day, month, year] = match;
    day = parseInt(day, 10);
    month = parseInt(month, 10);
    year = parseInt(year, 10);
    const currentYear = new Date().getFullYear();
    if (day < 1 || day > 31)
      return "Kun faqat 01-31 oralig‘ida bo‘lishi kerak!";
    if (month < 1 || month > 12)
      return "Oy faqat 01-12 oralig‘ida bo‘lishi kerak!";
    if (year < 1900 || year > currentYear)
      return `Yil 1900 va ${currentYear} oralig‘ida bo‘lishi kerak!`;

    return "";
  };
  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) errors.name = "Ism kiritish shart!";
    if (!formData.surename.trim()) errors.surename = "Familiya kiritish shart!";
    if (!formData.middle_name.trim())
      errors.middle_name = "Sharifni kiritish shart!";
    if (!formData.place_of_study.trim())
      errors.place_of_study = "Ta'lim joyini kiritish shart!";
    if (!formData.direction.trim())
      errors.direction = "Yo'nalishni kiritish shart!";
    if (!formData.tg_username.trim())
      errors.tg_username = "Telegram kiritish shart!";
    if (!formData.about.trim())
      errors.about = "O'zingiz haqingizda ma'lumot kiritish shart!";
    if (!file) {
      errors.file = "Tavsiya noma kiritish shart!";
    }
    if (!formData.phone_number.trim() || formData.phone_number.includes("_"))
      errors.phone_number = "To'liq telefon raqamini kiriting!";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Yaroqli email kiriting!";
    if (!formData.b_day.trim() || formData.b_day.includes("_")) {
      errors.b_day = "Tug'ilgan sanani to'liq kiriting!";
    } else {
      let ageError = validateDate(formData.b_day);
      if (ageError) errors.b_day = ageError;
    }
    if (!selectedRegion) errors.province = "Viloyatni tanlash shart!";
    if (!selectedDistrict) errors.district = "Tuman tanlash shart!";
    if (!isCheck) errors.offert = "Rozilik bildirilishi shart!";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const formatBday = (bday) => {
      const parts = bday.split(".");
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("surename", formData.surename);
    formDataToSend.append("middle_name", formData.middle_name);
    formDataToSend.append("phone_number", formData.phone_number);
    formDataToSend.append("b_day", formatBday(formData.b_day));
    formDataToSend.append("tg_username", formData.tg_username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("place_of_study", formData.place_of_study);
    formDataToSend.append("direction", formData.direction);
    formDataToSend.append("province", selectedRegion);
    formDataToSend.append("district", selectedDistrict);
    formDataToSend.append("about", formData.about);
    formDataToSend.append("file", file);

    try {
      const response = await fetch("https://online.raqamliavlod.uz/register/", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Serverda xatolik yuz berdi.");
      }

      const data = await response.json();
      setSuccess(true);
      navigate('/success')
    } catch (err) {
      setErrors("Xatolik yuz berdi. Qaytadan urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="signup">
      <p id="text-1">
        Raqamli avlod qizlar respublika tanloviga start beramiz.
      </p>
      <div className="signup-container">
        <div className="s-left">
          <h1>Ro'yxatdan o'tish</h1>
          <div className="signup-content">
            <form action="" onSubmit={handleSubmit}>
              <div className="input-row">
                <div className="input-col">
                  <input
                    type="text"
                    placeholder="Ism *"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.name}</span>
                </div>
                <div className="input-col">
                  <input
                    type="text"
                    placeholder="Familiya *"
                    name="surename"
                    value={formData.surename}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.surename}</span>
                </div>
              </div>
              <div className="input-row">
                <div className="input-col">
                  <InputMask
                    disabled={false}
                    mask="+\9\9\8 (99) 999-99-99"
                    placeholder="Telefon raqami *"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  >
                    {(inputProps) => <input {...inputProps} />}
                  </InputMask>
                  <span className="error">{errors.phone_number}</span>
                </div>
                <div className="input-col">
                  <input
                    type="text"
                    placeholder="Sharif *"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.middle_name}</span>
                </div>
              </div>
              <div className="input-row">
                <div className="input-col">
                  <InputMask
                    disabled={false}
                    mask="99.99.9999"
                    placeholder="DD.MM.YYYY *"
                    name="b_day"
                    value={formData.b_day}
                    onChange={handleChange}
                  >
                    {(inputProps) => <input {...inputProps} />}
                  </InputMask>
                  <span className="error">{errors.b_day}</span>
                </div>
                <div className="input-col">
                  <input
                    type="text"
                    placeholder="Telegram (@username) *"
                    name="tg_username"
                    value={formData.tg_username}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.tg_username}</span>
                </div>
              </div>
              <div className="input-row">
                <div className="input-col">
                  <input
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.email}</span>
                </div>
                <div className="input-col">
                  <input
                    type="text"
                    placeholder="O'qish joyi *"
                    name="place_of_study"
                    value={formData.place_of_study}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.place_of_study}</span>
                </div>
              </div>
              <div className="input-row">
                <div className="input-col">
                  <select
                    name="direction"
                    value={formData.direction}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Yo'nalish tanlang *
                    </option>
                    <option value="Yo'nalish 2">Yo'nalish 2</option>
                    <option value="Yo'nalish 3">Yo'nalish 3</option>
                  </select>
                  <span className="error">{errors.direction}</span>
                </div>
                <FileInput change={handleFileChange} fileName={file ? file.name : ''} />
              </div>
              <Regions />
              <div className="input-row">
                <div className="input-col w-100">
                  <textarea
                    name="about"
                    placeholder="O‘zingiz haqingizda qisqacha *"
                    value={formData.about}
                    onChange={handleChange}
                  ></textarea>
                  <span className="error t-error">{errors.about}</span>
                </div>
              </div>
              <Offert />
              <div className="input-row mt-0">
                <div className="input-col">
                  <button type="submit" disabled={loading}>
                    {loading ? "Ro’yxatdan o’tilmoqda..." : "Ro’yxatdan o’tish"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
