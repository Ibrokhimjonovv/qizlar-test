import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context";

const regionsURL =
  "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/regions.json";
const districtsURL =
  "https://raw.githubusercontent.com/MIMAXUZ/uzbekistan-regions-data/master/JSON/districts.json";

const Regions = () => {
    const { setSelectedDistrict, setSelectedRegion, selectedDistrict, selectedRegion, errors } = useContext(AppContext);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(regionsURL);
        if (response.ok) {
          const data = await response.json();
          setRegions(data);
        } else {
          console.error("Viloyatlar ma'lumotini olishda xatolik yuz berdi.");
        }
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };
    fetchRegions();
  }, []);

  const handleRegionChange = async (event) => {
    const selectedRegionId = Number(event.target.value);
    setSelectedRegion(selectedRegionId);
    try {
      const response = await fetch(districtsURL);
      if (response.ok) {
        const data = await response.json();
        const regionDistricts = data.filter(
          (district) => Number(district.region_id) === selectedRegionId
        );
        setDistricts(regionDistricts);
        if (regionDistricts.length === 0) {
          console.warn("Ushbu viloyatga tegishli tumanlar topilmadi.");
        }
      } else {
        console.error("Tumanlar ma'lumotini olishda xatolik yuz berdi.");
      }
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  const handleDistrictChange = (event) => {
    console.log(Number(event.target.value));
    
    setSelectedDistrict(Number(event.target.value));
  };

  return (
    <div className="input-row">
      <div className="input-col">
        <select
          id="regionSelect"
          value={selectedRegion || ""}
          onChange={handleRegionChange}
        >
          <option value="" disabled>
            Viloyatni tanlang *
          </option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name_uz.replace(/�/g, "'")}
            </option>
          ))}
        </select>
        <span className="error">{errors.province}</span>
      </div>
      <div className="input-col">
        <select
          id="districtSelect"
          value={selectedDistrict || ""}
          onChange={handleDistrictChange}
        >
          <option value="" disabled>
            Tumanni tanlang *
          </option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name_uz.replace(/�/g, "'")}
            </option>
          ))}
        </select>
        <span className="error">{errors.district}</span>
      </div>
    </div>
  );
};

export default Regions;