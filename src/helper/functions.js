function dateFormater(timestamp) {
  const date = new Date(timestamp)
  var year = date.getFullYear();
  var month = date.getMonth();
  var day = date.getDay();
  return `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
}
function initials(user) {
  const splitedName = user.displayName.split(" ");
  if (splitedName.length <= 1) return user.displayName[0].toUpperCase(); ``
  const firstNameInitial = splitedName[0].split("")[0];
  const lastNameInitial = splitedName[1].split("")[0];
  return firstNameInitial.toUpperCase() + lastNameInitial.toUpperCase();
}
function currencyForamter(amount, currency) {
  return Intl.NumberFormat("fr-CH", { style: "currency", currency: currency }).format(amount)
}

export {
  currencyForamter,
  dateFormater,
  initials
};
