var validationFunctions = {
  isFiniteNumber: function (value) {
    var result = typeof (value) == 'number' && isFinite(value) && !Number.isNaN(value);

    return result;
  },
  areFiniteNumbers: function (arr) {
    var self = this;
    var result = arr.every(function (value) {
      return self.isFiniteNumber(value);
    });

    return result;
  },
  isFunction: function (value) {
    var result = typeof (value) == 'function';

    return result;
  },
  isString: function (value) {
    var result = typeof (value) == 'string';

    return result;
  },
  isStringWithAcceptableLength: function (value, minAcceptableLength, maxAcceptableLength) {
    var result = this.isString(value) && value.length >= minAcceptableLength && value.length <= maxAcceptableLength;

    return result;
  },
  areStrings: function (arr) {
    var self = this;
    var result = arr.every(function (value) {
      return self.isString(value);
    });

    return result;
  },
  areStringsWithAcceptableLength: function (arr, minAcceptableLength, maxAcceptableLength) {
    var self = this;
    var result = arr.every(function (value) {
      return self.isStringWithAcceptableLength(value, minAcceptableLength, maxAcceptableLength);
    });

    return result;
  },
  isLessThenAcceptableLength: function (value, minLength) {
    var result = value.length < minLength;

    return result;
  },
  validateParametersAndThrowError: function (errorMessage, conditionResult1, conditionResult2) {
    var isAnyConditionRelevant = [...arguments].slice(1).some(function (value) {
      return value;
    });

    if (isAnyConditionRelevant) {
      throw Error(errorMessage);
    }
  },
};