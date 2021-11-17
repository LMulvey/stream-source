export const formatCurrency = (
  currencyUnit: number,
  options?: Intl.NumberFormatOptions
): string => {
  return new Intl.NumberFormat(navigator.language, {
    currency: 'USD',
    style: 'currency',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    ...options,
  }).format(currencyUnit);
};
