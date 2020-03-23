export default {
  isEmpty: value => {
    return value === "" ? true : false;
  },

  isEmail: value => {
    var patt = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return patt.test(value);
  },

  isMobile: value => {
    var patt = new RegExp(
      /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
    );
    return patt.test(value);
  },

  isPassword: value => {
    var patt = new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    );
    return patt.test(value);
  },

  isNumeric: value => {
    // var patt = new RegExp(/^[0-9]*$/);
    var patt = new RegExp(/^-?[0-9]\d*(\.\d+)?$/);
    return patt.test(value);
  }
};
