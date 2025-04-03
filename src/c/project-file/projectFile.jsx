import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
// import "./fileUploader.scss";

const FileUploader = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const { errors } = useContext(AppContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Fayl hajmi 10MB dan oshmasligi kerak!");
        return;
      }
      setSelectedFile(file);
      setError("");
      onFileSelect(file); // Yuklangan faylni tashqi komponentga uzatish
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    onFileSelect(null); // Faylni tashqi komponentdan o‘chirish
  };

  return (
    <div className="input-col w-100">
      <label htmlFor="file-upload" className="file-label">
        <p>{selectedFile ? selectedFile.name : "Loyihangiz faylini yuklang (Tavsiya qilinadi)"}</p>
      </label>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <p className="error">{errors.projectFile}</p>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default FileUploader;
