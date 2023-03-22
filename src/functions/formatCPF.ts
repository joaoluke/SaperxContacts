export const formatCPF = (cpf: string): string => {
  cpf = cpf.padStart(11, "0");
  const part1 = cpf.substr(0, 3);
  const part2 = cpf.substr(3, 3);
  const part3 = cpf.substr(6, 3);
  const part4 = cpf.substr(9, 2);

  return `${part1}.${part2}.${part3}-${part4}`;
};
