import React, { useContext, useState } from "react";
import { AppContext } from "../../context";
import "./fileInput.scss";

const FileInput = ({change, fileName}) => {
  const { errors, setFile } = useContext(AppContext);

  return (
    <div className="input-col">
      <label htmlFor="file" className="file-label">
        <p>{fileName || " Tavsiya noma yuklang *"}</p>
      </label>
      <input
        type="file"
        id="file"
        name="file"
        onChange={change}
        style={{ display: "none" }}
      />
      <span className="error">{errors.file}</span>
    </div>
  );
};

export default FileInput;
