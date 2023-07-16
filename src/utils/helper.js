const Constants = require("./constants.js");

const getMonthWithYear = () => {
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

const isNullOrUndefined = (param) => {
  return param == null || param == undefined;
};
module.exports = {
  getMonthWithYear: getMonthWithYear,
  getCurrentDate_ddmmyyyy_Format,
  isNullOrUndefined,
};
