// generative AI gemini.google.com ftw

export function formatNumber(number: number): string {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the number into integer and decimal parts
  const [integerPart, decimalPart] = numberString.split(".");

  // Format the integer part with commas every three digits
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Combine the formatted integer and decimal part
  return decimalPart ? formattedInteger + "." + decimalPart : formattedInteger;
}
