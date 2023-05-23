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
function initials(user){
  const splitedName = user.displayName.split(" ");
  if(splitedName.length <= 1) return user.displayName[0].toUpperCase();``
  const firstNameInitial = splitedName[0].split("")[0];
  const lastNameInitial = splitedName[1].split("")[0];
  return firstNameInitial.toUpperCase() + lastNameInitial.toUpperCase();
}
export {
  currencyForamter,
  dateFormater,
  initials
};
