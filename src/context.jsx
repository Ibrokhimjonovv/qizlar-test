import React, { Children, createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [errors, setErrors] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [file, setFile] = useState(null);
  const [ success, setSuccess ] = useState(false);


  return (
    <AppContext.Provider
      value={{
        selectedRegion,
        selectedDistrict,
        setSelectedDistrict,
        setSelectedRegion,
        errors,
        setErrors,
        isCheck,
        setIsCheck,
        file,
        setFile,
        success,
        setSuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
