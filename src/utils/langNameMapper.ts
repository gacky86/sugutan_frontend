const languageNames: { [key: string]: string } = {
  EN: "English",
  DE: "Deutsch",
  FR: "Français",
  IT: "Italiano",
};

export function getLanguageName(langCode: string): string {
  return languageNames[langCode] || langCode;
}
