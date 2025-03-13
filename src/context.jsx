import React, { Children, createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [errors, setErrors] = useState({});
  const [isCheck, setIsCheck] = useState(false);


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
        setIsCheck
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
