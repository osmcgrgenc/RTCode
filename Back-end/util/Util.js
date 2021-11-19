module.exports = class Util {
  static init() {
    return this;
  }

  static isNullOrEmpty(obj) {
    if (obj === null || obj === undefined || obj.length === 0) {
      return true;
    } else {
      return false;
    }
  }
};
