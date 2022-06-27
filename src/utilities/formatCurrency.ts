const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  currency: "USD",
  style: "currency",
});

export const formatCurrency = (number: number) => {
  number = number/100
  return CURRENCY_FORMATTER.format(number);
};
