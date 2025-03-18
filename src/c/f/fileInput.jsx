// import React, { useContext, useState } from "react";
// import { AppContext } from "../../context";
// import "./fileInput.scss";

// const MAX_FILES = 5;
// const MAX_SIZE_MB = 5;

// const FileInput = ({ fileName }) => {
//   const { errors, setFile, selectedFiles, setSelectedFiles } =
//     useContext(AppContext);

//   // const handleFileChange = (event) => {
//   //   const files = Array.from(event.target.files);
//   //   let newFiles = [...selectedFiles];

//   //   for (let file of files) {
//   //     if (newFiles.length >= MAX_FILES) {
//   //       alert("Maksimal 5 ta fayl yuklash mumkin!");
//   //       break;
//   //     }

//   //     if (file.size > MAX_SIZE_MB * 1024 * 1024) {
//   //       alert(`"${file.name}" fayli 5MB dan katta!`);
//   //       continue;
//   //     }

//   //     newFiles.push(file);
//   //   }

//   //   setSelectedFiles(newFiles);
//   // };

//   const removeFile = (index) => {
//     const newFiles = selectedFiles.filter((_, i) => i !== index);
//     setSelectedFiles(newFiles);
//     setFile(newFiles);
//   };

//   return (
//     <div className="input-col w-100">
//       <label htmlFor="" id="t">
//         Tavsiya noma (Institut, maktab yoki MFY tomonidan beriladi)
//       </label>
//       <label htmlFor="file" className="file-label">
//         <p>
//           {(selectedFiles.length > 0 && (
//             <p>{selectedFiles.length} ta yuklandi</p>
//           )) ||
//             "Tavsiya noma yuklang (5 MB) *"}
//         </p>
//       </label>
//       <input
//         type="file"
//         id="file"
//         name="file"
//         multiple
//         onChange={handleFileChange}
//         style={{ display: "none" }}
//       />
//       <span className="error">{errors.selectedFiles}</span>

//       {/* Tanlangan fayllar ro‘yxati */}
//       {selectedFiles.length > 0 && (
//         <ul className="file-list">
//           {selectedFiles.map((file, index) => (
//             <li key={index}>
//               <p>{file.name}</p>
//               <button onClick={() => removeFile(index)} type="button">
//                 +
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default FileInput;

import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import "./fileInput.scss";

const FileInput = ({ change, fileName }) => {
  const { errors, setFile } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5 MB = 5 * 1024 * 1024 bytes
        alert("Fayl hajmi 5 MB dan oshmasligi kerak!");
        return;
      }
      setFile(file);
      setSelectedFile(file.name);
      setFileError(""); // Xatolikni tozalaymiz
    }
  };

  const removeFile = () => {
    setFile(null);
    setSelectedFile(null);
  };

  return (
    <div className="input-col w-100">
      <label htmlFor="" id="t">
        Tavsiya noma (Institut, maktab yoki MFY tomonidan beriladi)
      </label>
      <label htmlFor="file" className="file-label">
        <p>{fileName || " Tavsiya noma yuklang *"}</p>
      </label>
      <input
        type="file"
        id="file"
        name="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {
        errors.file && <span className="error">{errors.file}</span>
      }
      {selectedFile && (
        <ul className="file-list">
          <li>
            <p>{selectedFile}</p>
            <button className="remove-file" onClick={removeFile}>
              +
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default FileInput;
