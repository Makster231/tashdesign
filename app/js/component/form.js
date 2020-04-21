"use strict";

(function($, window, document) {
  //  Get value from the inputs
  let name = $('input[name="name"]');
  let phone = $('input[name="phone"]');

  //  validate Name
  function isValidName(name) {
    return /^([A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?){2,}/i.test(name);
  }

  function isValidPhone(phone) {
    return (
      phone.split("").filter(function(i) {
        return !Number.isNaN(Number.parseInt(i));
      }).length >= 10
    );
  }

  let validate = function validate(input, validator) {
    let value = input.val();

    if (validator(value)) {
      input.removeClass("js-inValid");
      input.addClass("js-valid");
      return true;
    } else {
      input.removeClass("js-valid");
      input.addClass("js-inValid");
      return false;
    }
  };

  let addFieldValidation = function addFieldValidation(input, validator) {
    input.on("keyup", function() {
      if (validate(input, validator, true)) {
        if (input.val().length === 0) {
          input.removeClass("js-valid js-inValid");
        }
      }
    });
    input.on("blur", function() {
      validate(input, validator);
      if (input.val().length === 0) {
        input.removeClass("js-valid js-inValid");
      }
    });
  };
  $(() => {
    addFieldValidation(name, isValidName);
    addFieldValidation(phone, isValidPhone);
  });
})(window.jQuery, window, document);
