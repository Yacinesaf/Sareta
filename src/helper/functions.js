function currencyForamter(currency, symbol) {
  return `${parseFloat(currency).toFixed(2)} ${symbol}`;
}
function dateFormater(timestamp) {
  const date = new Date(timestamp)
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDay();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}

export {
  currencyForamter,
  dateFormater
};
