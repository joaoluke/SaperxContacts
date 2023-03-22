export const formatPhoneNumber = (phoneNumber: number): string => {
  const phoneNumberString = phoneNumber.toString().replace(/\D/g, "");
  const match = phoneNumberString.match(/^(\d{2})(\d{4,5})(\d{4})$/);
  if (match) {
    const prefix =
      match[2].length === 4
        ? match[2]
        : match[2].slice(0, 1) + " " + match[2].slice(1);
    return `(${match[1]}) ${prefix}-${match[3]}`;
  }
  return phoneNumberString;
};
