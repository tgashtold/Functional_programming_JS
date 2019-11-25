// --------------- task 1 (partial application) ----------------

function partial() {
  var funcForParcialExec = arguments[arguments.length - 1];
  var funcArgs = [...arguments].slice(0, arguments.length - 1);

  validationFunctions.validateParametersAndThrowError('Last function parameter must be a function',
    !validationFunctions.isFunction(funcForParcialExec));

  return function () {
    var partialFuncArgs = funcArgs.concat([...arguments]);

    return funcForParcialExec.apply(null, partialFuncArgs);
  };
}


//functions for testing
function sumValues() {
  validationFunctions.validateParametersAndThrowError('Function accepts only finite numbers as parameters',
    !validationFunctions.areFiniteNumbers([...arguments]));

  var sum = 0;

  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  return sum;
}

function showColleguesNames() {
  var namesArr = Array.from(arguments);

  validationFunctions.validateParametersAndThrowError('Function accepts only string type parameters with length between 2-20 symbols',
    !validationFunctions.areStringsWithAcceptableLength(namesArr, 2, 20));

  return 'My collegues in the office are: ' + namesArr.join(', ');
}


//tests
console.log('******* Tests for partial application');

var totalSum = partial(1, 2, sumValues)(3, 4);
console.log(totalSum);

var namesMessage = partial('Slava', 'Kolya', showColleguesNames)('Vera', 'Ira');
console.log(namesMessage);


//errors testing 
// var totalSumError = partial(1, Infinity, sumValues)(4, 2);
// var totalSumError = partial(1, 2, 3)(4, 2);
// var namesMessageError = partial('fsdfsd', 'Kolya', showColleguesNames)(function(){}, 'Ira');


//--------------- task 2 (currying) ----------------


function curry(func) {
  validationFunctions.validateParametersAndThrowError('Function parameter must be a function', !validationFunctions.isFunction(func));

  return function curriedFunc() {
    var args = [...arguments];

    if (args.length >= func.length) {
      return func.apply(this, args);
    }

    return function () {
      return curriedFunc.apply(this, args.concat([...arguments]));
    };
  };
}


//functions for testing
function summarize(value1, value2, value3, value4, value5) {
  validationFunctions.validateParametersAndThrowError('Function accepts 5 finite numbers as parameters',
    !validationFunctions.areFiniteNumbers([...arguments]), validationFunctions.isLessThenAcceptableLength(arguments, 5));

  return value1 + value2 + value3 + value4 + value5;
}

function showFiveNames(name1, name2, name3, name4, name5) {
  var namesArr = Array.from(arguments);

  validationFunctions.validateParametersAndThrowError('Function accepts 5 string type parameters',
    !validationFunctions.areStringsWithAcceptableLength(namesArr, 2, 20), validationFunctions.isLessThenAcceptableLength(arguments, 5));

  var result = 'My favorite 5 names are: ' + namesArr.join(', ');

  return result;
}


//tests
console.log('******* Tests for currying function');

console.log(curry(summarize)(1)(2)(3)(4)(5));
console.log(curry(showFiveNames)('Kate')('Ivan')('Semen')('Oleg')('Nina'));


//errors testing 
// console.log(curry(12));
// console.log(curry(summarize)(1)(NaN)(3)(4)(5));
// console.log(curry(showFiveNames)('Kate')([45])('Semen')('Oleg')('Nina'));


//--------------- task 3 (linear fold) ----------------


function linearFold(arr, callback, initialValue) {
  var errorMessage = 'The function must contain 3 parameters \n 1. array \n 2. callback function \n 3. initial value of type accaptable by callback function';

  validationFunctions.validateParametersAndThrowError(errorMessage, validationFunctions.isLessThenAcceptableLength(arguments, 3),
    !Array.isArray(arguments[0]), !validationFunctions.isFunction(arguments[1]));

  var result = initialValue;

  for (var i = 0; i < arr.length; i++) {
    result = callback(result, arr[i], i, arr);
  }

  return result;
}


//functions for testing
function makeCalculations(initValue, currentValue, index, arr) {
  var errorMessage = 'The function must contain 4 parameters \n 1-3. finite numbers \n 4. array';

  validationFunctions.validateParametersAndThrowError(errorMessage, validationFunctions.isLessThenAcceptableLength(arguments, 4),
    !Array.isArray(arguments[3]), !validationFunctions.areFiniteNumbers([...arguments].splice(0, 3)));

  var resultValue = initValue * arr.length + index + currentValue;

  return resultValue;
}

function showList(initValue, currentValue, index, arr) {
  var errorMessage = 'The function must contain 4 parameters \n 1-2. strings \n 3. finite number \n 4. array';

  validationFunctions.validateParametersAndThrowError(errorMessage, validationFunctions.isLessThenAcceptableLength(arguments, 4),
    !Array.isArray(arguments[3]), !validationFunctions.areStrings([...arguments].slice(0, 2)),
    !validationFunctions.isFiniteNumber(index));

  return initValue + '\n' + (index + 1) + ' of ' + arr.length + ' ' + currentValue + ';';
}


//tests
console.log('******* Tests for linear fold');

console.log(linearFold([1, 2, 3], makeCalculations, 0));
console.log(linearFold(['cat', 'dog', 'fish', 'parrot'], showList, 'My pets:'));


//errors testing 
// console.log(linearFold(makeCalculations, [1,2],  0));
// console.log(linearFold(['cat', 23, 'fish', 'parrot'], showList, 'My pets:'));
// console.log(linearFold([1, 2, 3], makeCalculations, '34'));


//--------------- task 4 (linear unfold) ----------------


function linearUnfold(callback, initialValue) {
  var errorMessage = 'The function accepts two parameters: \n 1. callback function  \n 2. parameter of type expacted by callback function';

  validationFunctions.validateParametersAndThrowError(errorMessage, !validationFunctions.isFunction(arguments[0]),
    validationFunctions.isLessThenAcceptableLength(arguments, 2));

  var result = [initialValue];
  var valueForCallback = initialValue;

  while (valueForCallback || (valueForCallback === 0)) {
    result.push(callback(valueForCallback));

    valueForCallback = result[result.length - 1];
  }

  result.pop();

  return result;
}


//function for testing
function getTwiceValuesFunc(limit) {
  validationFunctions.validateParametersAndThrowError('The function expects finite number as a parameter',
    !validationFunctions.isFiniteNumber(arguments[0]));

  return function (value) {
    validationFunctions.validateParametersAndThrowError('The function expects finite number as a parameter',
      !validationFunctions.isFiniteNumber(arguments[0]));

    if (value < limit) {
      return value * 2;
    }
  };
}

function getIncreaseByThreeFunc(limit) {
  validationFunctions.validateParametersAndThrowError('The function expects finite number as a parameter',
    !validationFunctions.isFiniteNumber(arguments[0]));

  return function (value) {
    validationFunctions.validateParametersAndThrowError('The function expects finite number as a parameter',
      !validationFunctions.isFiniteNumber(arguments[0]));

    if (value < limit) {
      return value + 3;
    }
  };
}


//test
console.log('******* Tests for linearUnfold function');

console.log(linearUnfold(getTwiceValuesFunc(50), 5));
console.log(linearUnfold(getTwiceValuesFunc(20), 3));
console.log(linearUnfold(getIncreaseByThreeFunc(8), -6));
console.log(linearUnfold(getIncreaseByThreeFunc(6), 0));


//errors testing 
// console.log(linearUnfold(getTwiceValuesFunc(20)));
// console.log(linearUnfold(getTwiceValuesFunc('20'),5));


//--------------- task 5 (map) ----------------


function makeMap(arr, callback) {
  validationFunctions.validateParametersAndThrowError('The function expects 2 parameters: \n 1. array \n 2. callback function',
    !Array.isArray(arguments[0]), !validationFunctions.isFunction(arguments[1]));

  var resultArr = [];

  for (var i = 0; i < arr.length; i++) {
    resultArr.push(callback(arr[i], i, arr));
  }

  return resultArr;
}


//functions for testing
function makeCalc(elementValue, index, arr) {
  var errorMessage = 'The function must contain 3 parameters \n 1-2. finite numbers \n 3. array';

  validationFunctions.validateParametersAndThrowError(errorMessage, validationFunctions.isLessThenAcceptableLength(arguments, 3),
    !Array.isArray(arguments[2]), !validationFunctions.areFiniteNumbers([...arguments].slice(0, 1)));

  var result = index * arr.length + elementValue;

  return result;
}

function addIndex(elementValue, index, arr) {
  var errorMessage = 'The function must contain 3 parameters \n 1. string \n 2. finite number \n 3. array';

  validationFunctions.validateParametersAndThrowError(errorMessage, validationFunctions.isLessThenAcceptableLength(arguments, 3),
    !Array.isArray(arguments[2]), !validationFunctions.isString(arguments[0]), !validationFunctions.isFiniteNumber(arguments[1]));

  var result = elementValue + '_' + (index + 1) + '/' + arr.length;

  return result;
}


//tests
console.log('******* Tests for map');

console.log(makeMap([1, 2, 3, 4, 5], makeCalc));
console.log(makeMap(['cat', 'dog', 'fish', 'parrot'], addIndex));


//errors testing 
// console.log(makeMap([1, 2, 3, 4, 5]));
// console.log(makeMap([1, 2, 3, NaN, 5], makeCalc));
// console.log(makeMap(['cat', 'dog', 2, 'parrot'], addIndex));


//--------------- task 6 (filter) ----------------


function filterArr(arr, callback) {
  validationFunctions.validateParametersAndThrowError('The function expects 2 parameters: \n 1. array \n 2. callback function',
    !Array.isArray(arguments[0]), !validationFunctions.isFunction(arguments[1]));

  var resultArr = [];

  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      resultArr.push(arr[i]);
    }
  }

  return resultArr;
}


//functions for testing
function getEvenNumbers(value) {
  validationFunctions.validateParametersAndThrowError('The function expects finite number as a parameter',
    !validationFunctions.isFiniteNumber(value));

  return value % 2 === 0;
}

function getBigStringsWithEvenInd(value, index) {
  validationFunctions.validateParametersAndThrowError('The function expects 2 parameters: \n 1. string \n 2. finite number',
    !validationFunctions.isFiniteNumber(arguments[1]), !validationFunctions.isString(arguments[0]));

  var isEven = value.length > 10 && index % 2 === 0;

  return isEven;
}


//tests
console.log('******* Tests for filter');

console.log(filterArr([3, 4, 5, 6, 7, 8], getEvenNumbers));
console.log(filterArr(['settlements', 'announcement', 'international', 'inconclusive', 'administration'], getBigStringsWithEvenInd));


//errors testing 
// console.log(filterArr([3, 4, 5, 6, 7, 8]));
// console.log(filterArr([3, 4, 5, NaN, 7, 8], getEvenNumbers));
// console.log(filterArr(['settlements', 23, 'international', 'inconclusive', 'administration'], getBigStringsWithEvenInd));


//--------------- task 7 (average of even numbers) ----------------


function getEvenNumbersAvg(arr) {
  validationFunctions.validateParametersAndThrowError('The function expects an array with finite numbers as a parameter',
    !Array.isArray(arguments[0]), !validationFunctions.areFiniteNumbers(arguments[0]));

  var avgNumbersArr = filterArr(arr, getEvenNumbers);
  var sumValue = linearFold(avgNumbersArr, function (initialValue, currentValue) {
    return initialValue + currentValue;
  }, 0);
  var result;

  if (avgNumbersArr.length) {
    result = sumValue / avgNumbersArr.length;
  } else {
    throw new Error('The array doesn`t have even numbers');
  }

  return result;
}


//tests
console.log('******* Tests for getting average of even numbers');

console.log(getEvenNumbersAvg([1, 23, 2, 6, 12, 0]));
console.log(getEvenNumbersAvg([-2, 5, 3, -6, 7, 0, 0]));


//errors testing 
// console.log(getEvenNumbersAvg(function(){}));
// console.log(getEvenNumbersAvg(['fff', 5, 3, 1]));
// console.log(getEvenNumbersAvg([3, 5, 3, 1]));


//--------------- task 8 (sum of random numbers) ----------------


function sumTenRandomNumbers() {
  var randomNumbersArr = [];

  for (var i = 0; i < 10; i++) {
    randomNumbersArr.push(Math.random());
  }

  var randomNumbersSum = linearFold(randomNumbersArr, function (initValue, el) {
    return initValue + el;
  }, 0);

  return randomNumbersSum;
}


//tests
console.log('******* Tests for getting sum of random numbers');

console.log(sumTenRandomNumbers());
console.log(sumTenRandomNumbers());


//--------------- task 9 (first) ----------------


function findFirst(arr, callback) {
  validationFunctions.validateParametersAndThrowError('The function expects 2 parameters: \n 1. array \n 2. callback function',
    !Array.isArray(arguments[0]), !validationFunctions.isFunction(arguments[1]));

  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return arr[i];
    }
  }
}


//tests
console.log('******* Tests for findFirst function');

console.log(findFirst([3, 4, 5, 6, 7, 8], getEvenNumbers));
console.log(findFirst(['settlements', 'announcement', 'international', 'inconclusive', 'administration'], getBigStringsWithEvenInd));


//errors testing 
// console.log(findFirst([3, 4, 5, 6, 7, 8], 23));
// console.log(findFirst([3, 4, 5, 6, 7, 8]));


//--------------- task 10 (lazy evaluation) ----------------


function makeLazy(funcToMakeLazy) {
  validationFunctions.validateParametersAndThrowError('Function expects a function as first parameter',
    !validationFunctions.isFunction(arguments[0]));

  var argsForLazyFanc = Array.from(arguments).slice(1);

  return function () {
    return funcToMakeLazy.apply(null, argsForLazyFanc);
  };
}


//function for testing
function showFriendsNames() {
  var namesArr = Array.from(arguments);

  validationFunctions.validateParametersAndThrowError('The function expects strings as parameters',
    !validationFunctions.areStrings(namesArr));

  return 'My friends: ' + namesArr.join(', ');
}


//test
console.log('******* Tests for makeLazy function');

var lazyFunc = makeLazy(showFriendsNames, 'Igor', 'Ivan', 'Oleg');
console.log(lazyFunc());


//errors testing 
// makeLazy(12, 'Igor', 'Ivan', 'Oleg');
// makeLazy(showFriendsNames, NaN, 'Ivan', 'Oleg')();


//--------------- task 11 (memoization) ----------------


function makeMemoization(func) {
  validationFunctions.validateParametersAndThrowError('Function expects a function as first parameter',
    !validationFunctions.isFunction(arguments[0]));

  var cache = {};

  return function (value) {
    if (cache[value] != undefined) {
      return cache[value];
    } else {
      var result = func(value);

      cache[value] = result;

      return result;
    }
  };
}


//function for testing
function getFibonacciValue(numberOfValueInSequence) {
  validationFunctions.validateParametersAndThrowError('Function expects finite number as a parameter',
    !validationFunctions.isFiniteNumber(arguments[0]));

  var fibValue = (numberOfValueInSequence === 0 || numberOfValueInSequence === 1) ?
    numberOfValueInSequence :
    (getFibonacciValue(numberOfValueInSequence - 1) + getFibonacciValue(numberOfValueInSequence - 2));

  return fibValue;
}


//test
console.log('******* Tests for memoization');

var funcWithCache = makeMemoization(getFibonacciValue);
console.log(funcWithCache(12));
console.log(funcWithCache(7));


//errors testing 
// makeMemoization(45);
// funcWithCache(NaN);