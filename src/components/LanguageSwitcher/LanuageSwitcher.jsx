import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 1 ? 2 : 1)); // Toggle between Serbian (1) and English (2)
  };

  return (
    <button onClick={toggleLanguage} className="bg-white fs-12">
      {language === 1 ? "English" : "Serbian"}
    </button>
  );
};

export default LanguageSwitcher;
