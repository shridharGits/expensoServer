const Constants = require("./constants");

const getMonthlWithYear = () => {
  const currentDate = new Date();
  return `${
    Constants.monthNames[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;
};

const getCurrentDate_ddmmyyyy_Format = () => {
  const currentDate = new Date();
  return `${currentDate.getDay()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getFullYear()}`;
};
module.exports = {
  getMonthlWithYear: getMonthlWithYear,
  getCurrentDate_ddmmyyyy_Format,
};
