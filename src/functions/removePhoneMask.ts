export const removePhoneMask = (phoneArray: string[]): string[] => {
  return phoneArray.map((phone) => phone.replace(/\D/g, ""));
};
