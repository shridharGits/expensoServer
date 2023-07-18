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

const isMonth31 = (month) => {
  return Constants.MONTHSWITH31DAYS.indexOf(month) > -1 ? true : false;
};

const getNumberOfDaysInMonth = (month, year) => {
  return month == 2
    ? year % 4 == 0
      ? 29
      : 28
    : Constants.MONTHSWITH31DAYS.indexOf(Constants.monthNames[month - 1]) > -1
    ? 31
    : 30;
  // if (month == 2) {
  //   return year % 4 == 0 ? 29 : 28;
  // }
  // return Constants.MONTHSWITH31DAYS.indexOf(month) > -1
  // ? 31
  // : 30;
};

module.exports = {
  getMonthWithYear: getMonthWithYear,
  getCurrentDate_ddmmyyyy_Format,
  isNullOrUndefined,
  isMonth31,
  getNumberOfDaysInMonth,
};
