/**
 * Função que limpa os caracteres especiais e caracteres indevidos do CEP
 * @param inputZipcodeString string string do cep, formatado ou não
 * @returns a string limpa sem caracteres especiais.
 */

export function zipcodeSanitize(inputZipcodeString: string): string {
  return inputZipcodeString.trim().replace(/\D/gim, '');
}
