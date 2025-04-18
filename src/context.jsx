import React, { Children, createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [errors, setErrors] = useState({});
  const [isCheck, setIsCheck] = useState(false);
  const [file, setFile] = useState(null);
  const [projectFile, setProjectFile] = useState(null);
  const [ success, setSuccess ] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [ directions, setDirections ] = useState("");
  const [ slide, setSlide ] = useState(false);
  const [background, setBackground] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // activeTab ni qo'shish


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
        selectedFiles,
        setSelectedFiles,
        directions,
        setDirections,
        slide,
        setSlide,
        background,
        setBackground,
        isChecked,
        setIsChecked,
        activeTab,
        setActiveTab,
        projectFile,
        setProjectFile,
        selectedRegionId,
        setSelectedRegionId,
        selectedDistrictId,
        setSelectedDistrictId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
