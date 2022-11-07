function currencyForamter(currency, symbol) {
  return `${parseFloat(currency).toFixed(2)} ${symbol}`;
}

export {
  currencyForamter
};
