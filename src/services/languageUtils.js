export const mapLanguageCodeToId = (code) => {
  const languageMap = {
    sr: 1, // Serbian
    en: 2, // English
  };

  return languageMap[code] || 1; // Default to Serbian if not matched
};
