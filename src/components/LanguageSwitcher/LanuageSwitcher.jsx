import { useLocation, useNavigate } from "react-router-dom";

import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLanguage = i18n.language;

  const switchLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "sr" : "en";

    // Provera da li URL sadrži "blog"
    if (location.pathname.includes("blog")) {
      i18n.changeLanguage(newLanguage);
      navigate("/aktuelnosti");
      return;
    }

    // default ponašanje
    i18n.changeLanguage(newLanguage);
  };

  return (
    <button
      className="bg-transparent px-3 py-2 rounded ms-xl-0 ms-auto text-xs primary-color"
      onClick={switchLanguage}
    >
      {currentLanguage === "en" ? "Srpski" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
