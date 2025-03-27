import React from "react";
import "./admin.scss";

const Admin = () => {
  const downloadExcel = async () => {
    try {
      const response = await fetch(
        "https://online.raqamliavlod.uz/excport_excel_data",
        {
          method: "GET",
          mode: "cors", // CORS'ni faollashtirish
        }
      );

      if (!response.ok) {
        throw new Error(`Xatolik: ${response.status} - ${response.statusText}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "exported_data.xlsx"; // Fayl nomi
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Xatolik:", error);
      alert(`Fayl yuklab olinmadi! Xatolik tafsiloti: ${error.message}`);
    }
  };

  return (
    <div className="admin-page">
      <div className="us">
        <div className="users">
          <span>Foydalanuvchilar soni:</span>
          <span>75</span>
        </div>
        <div className="download-btn">
          <button onClick={downloadExcel}>Excel Yuklab Olish</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
