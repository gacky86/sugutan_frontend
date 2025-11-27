const languageNames: { [key: string]: string } = {
  EN: "English",
  DE: "Deutsch",
  FR: "français",
  IT: "italiano",
};

export function getLanguageName(japaneseName: string): string {
  return languageNames[japaneseName] || japaneseName;
}
