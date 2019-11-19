// --------------- task 1 (partial application) ----------------


function partial(func) {
  var funcArgs = Array.apply(null, arguments).slice(0, arguments.length - 1),
    funcForParcialExec = arguments[arguments.length - 1];

  return function () {
    var partialFuncArgs = funcArgs.concat(Array.apply(null, arguments));

    return funcForParcialExec.apply(null, partialFuncArgs);
  };
}


//functions for testing
function sumValues() {
  var sum = 0;

  for (var i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }

  return sum;
}

function showColleguesNames() {
  var namesArr = Array.apply(null, arguments);

  return 'My collegues in the office are: ' + namesArr.join(', ');
}


//tests
console.log('******* Tests for partial application');

var totalSum = partial(1, 2, sumValues)(3, 4);
console.log(totalSum);

var namesMessage = partial('Slava', 'Kolya', showColleguesNames)('Vera', 'Ira');
console.log(namesMessage);


//--------------- task 2 (currying) ----------------


function curry(func) {
  return function curriedFunc() {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function () {
        var args2 = [];

        for (var i = 0; i < arguments.length; i++) {
          args2[i] = arguments[i];
        }

        return curriedFunc.apply(this, args.concat(args2));
      };
    }
  };
}


//functions for testing
function summarize(x, y, z, d, h) {
  return x + y + z + d + h;
}

function showFiveNames(name1, name2, name3, name4, name5) {
  var namesArr = Array.apply(null, arguments);

  return 'My favorite 5 names are: ' + namesArr.join(', ');
}


//tests
console.log('******* Tests for currying function');

console.log(curry(summarize)(1)(2)(3)(4)(5));
console.log(curry(showFiveNames)('Kate')('Ivan')('Semen')('Oleg')('Nina'));


//--------------- task 3 (linear fold) ----------------


function linearFold(arr, callback, initialValue) {
  var result = initialValue;

  for (var i = 0; i < arr.length; i++) {
    result = callback(result, arr[i], i, arr);
  }
  return result;
}


//functions for testing
function makeCalculations(initValue, el, i, arr) {
  return initValue * arr.length + i + el;
}

function showList(initValue, el, i, arr) {
  return initValue + '\n' + (i + 1) + ' of ' + arr.length + ' ' + el + ';';
}


//tests
console.log('******* Tests for linear fold');

console.log(linearFold([1, 2, 3], makeCalculations, 0));
console.log(linearFold(['cat', 'dog', 'fish', 'parrot'], showList, 'My pets:'));


//--------------- task 4 (linear unfold) ----------------


function linearUnfold(callback, initialValue) {
  var result = [],
    valueForCallback = initialValue;

  while (callback(valueForCallback)) {
    result.push(callback(valueForCallback));
    valueForCallback = result[result.length - 1];
  }
  return result;
}


//function for testing
function getTwiceValuesFunc(limit) {
  return function (value) {
    if (value < limit) {
      return value * 2;
    }
  };
}


//test
console.log('******* Tests for linearUnfold function');

console.log(linearUnfold(getTwiceValuesFunc(50), 5));


//--------------- task 5 (map) ----------------


function makeMap(arr, callback) {
  var resultArr = [];

  for (var i = 0; i < arr.length; i++) {
    resultArr[i] = callback(arr[i], i, arr);
  }

  return resultArr;
}


//functions for testing
function makeCalc(el, i, arr) {
  return i * arr.length + el;
}

function addIndex(el, i, arr) {
  return el + '_' + (i + 1) + '/' + arr.length;
}


//tests
console.log('******* Tests for map');

console.log(makeMap([1, 2, 3, 4, 5], makeCalc));
console.log(makeMap(['cat', 'dog', 'fish', 'parrot'], addIndex));


//--------------- task 6 (filter) ----------------


function filterArr(arr, callback) {
  var resultArr = [];

  for (var i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr) && resultArr.push(arr[i]);
  }

  return resultArr;
}


//functions for testing
function getEvenNumbers(el) {
  return el % 2 === 0;
}

function getBigEvenStrings(el, i) {
  return el.length > 10 && i % 2 === 0;
}


//tests
console.log('******* Tests for filter');

console.log(filterArr([3, 4, 5, 6, 7, 8], getEvenNumbers));
console.log(filterArr(['settlements', 'announcement', 'international', 'inconclusive', 'administration'], getBigEvenStrings));


//--------------- task 7 (average of even numbers) ----------------


function getEvenNumbersAvg(arr) {
  var avgNumbersArr = filterArr(arr, getEvenNumbers),
    sumValue = linearFold(avgNumbersArr, function (initVal, el) {
      return initVal + el;
    }, 0);

  return sumValue / avgNumbersArr.length;
}


//tests
console.log('******* Tests for getting average of even numbers');

console.log(getEvenNumbersAvg([1, 23, 2, 6, 12, 0]));
console.log(getEvenNumbersAvg([-2, 5, 3, -6, 7, 0, 0]));


//--------------- task 8 (sum of random numbers) ----------------


function sumTenRandomNumbers() {
  var randomNumbersArr = [];
  for (i = 0; i < 10; i++) {
    randomNumbersArr.push(Math.random());
  }

  return linearFold(randomNumbersArr, function (initValue, el) {
    return initValue + el;
  }, 0);
}


//tests
console.log('******* Tests for getting sum of random numbers');

console.log(sumTenRandomNumbers());
console.log(sumTenRandomNumbers());


//--------------- task 9 (first) ----------------


function findFirst(arr, callback) {
  var result;

  for (var i = 0; i < arr.length; i++) {
    if (callback(arr[i], i, arr)) {
      return result = arr[i];
    }
  }
}


//tests
console.log('******* Tests for findFirst function');

console.log(findFirst([3, 4, 5, 6, 7, 8], getEvenNumbers));
console.log(findFirst(['settlements', 'announcement', 'international', 'inconclusive', 'administration'], getBigEvenStrings));


//--------------- task 10 (lazy evaluation) ----------------

function makeLazy(funcToMakeLazy) {
  var argsForLazyFanc = Array.apply(null, arguments).slice(1);

  return function () {
    return funcToMakeLazy.apply(null, argsForLazyFanc);
  };
}


//function for testing
function showFriendsNames() {
  var namesArr = Array.apply(null, arguments);

  return 'My friends: ' + namesArr.join(', ');
}


//test
console.log('******* Tests for makeLazy function');

var lazyFunc = makeLazy(showFriendsNames, 'Igor', 'Ivan', 'Oleg');
console.log(lazyFunc());


//--------------- task 11 (memoization) ----------------


function makeMemoization(func) {
  var cache = {};
  return function (n) {
    if (cache[n] != undefined) {
      return cache[n];
    } else {
      var result = func(n)
      cache[n] = result;
      return result;
    }
  };
}


//function for testing
function getFibonacciValue(n) {
  return (n === 0 || n === 1) ? n : (getFibonacciValue(n - 1) + getFibonacciValue(n - 2));
}


//test
console.log('******* Tests for memoization');

var funcWithCache = makeMemoization(getFibonacciValue);
console.log(funcWithCache(34));
console.log(funcWithCache(7));