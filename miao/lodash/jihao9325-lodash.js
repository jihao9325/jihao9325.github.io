var jihao9325 = {

  identity: function (...value) {
    return value[0]
  },

  property: function (path) {
    return function (obj) {
      return obj[path]
    }
  },

  chunk: function (array, size = 1) {
    var result = []
    for (var i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size))
    }
    return result
  },

  compact: function (array) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      if ((array[i] & array[i]) != 0) {
        result.push(array[i])
      }
    }
    return result
  },

  reduce: function (collection, reducer, initialValue) {
    if (Array.isArray(collection)) {
      var i = 0
      if (arguments.length == 2) {
        i = 1
        initialValue = array[0]
      }
      for (i; i < array.length; i++) {
        initialValue = reducer(initialValue, array[i], i, array)
      }
      return initialValue
    } else if (typeof collection == "object") {
      for (var key in collection) {
        initialValue = reducer(initialValue, collection[key], key, collection)
      }
      return initialValue
    }
  },

  reduceRigth: function (array, reducer, initialValue) {
    var i = array.length - 1
    if (arguments.length == 2) {
      initialValue = array[i]
      i = array.length - 2
    }
    for (i; i >= 0; i--) {
      initialValue = reducer(initialValue, array[i], i, array)
    }
    return initialValue
  },

  forEach: function (collection, action = jihao9325.identity) {
    for (var key in collection) {
      action(collection[key], key)
    }
    return collection
  },

  forEachRight: function (array, action = jihao9325.identity) {
    for (var i = array.length - 1; i >= 0; i--) {
      action(array[i], i, array)
    }
    return array
  },

  concat: function (array, ...values) {
    var result = []
    result.push(...array)
    return values.reduce (function (result, item, index, values) {
      if (Array.isArray(item)) {
        result.push(...item)
      } else {
        result.push(item)
      }
      return result
    }, result)
  },

  map: function (collection, mapper) {
    return collection.reduce(function (result, item, index, collection) {
      result.push(mapper(item, index, collection))
      return result
    }, [])
  },

  filter: function (collection, test) {
    return collection.reduce(function (result, item, index, collection) {
      if (test(item, index, collection)) {
        result.push(item)
      }
      return result
    }, [])
  },

  fill: function (array, value, start = 0, end = array.length) {
    if (start < 0) {start = array.length + start}
    if (end < 0) {end = array.length + end}
    array.reduce(function (result, item, index, array) {
      if (index >= start && index < end) {
        array[index] = value
      }
    }, 0)
    return array
  },

  slice: function (array, start = 0, end = array.length) {
    if (start < 0) {start = array.length + start}
    if (end < 0) {end = array.length + end}
    if (end > array.length) {end = array.length}
    return array.redue(function (result, item, index, array) {
      if (index >= start && index < end) {
        result.push(array[index])
      }
      return result
    }, [])
  },

  flatten: function (array) {
    return array.reduce(function (result, item, index, array) {
      if (Array.isArray(item)) {
        result.push(...item)
      } else {
        result.push(item)
      }
      return result
    },[])
  },

  difference: function (array, ...values) {
    return array.filter(function (item) {
      var ary = [].concat(...values)
      return ary.indexOf(item) == -1
    })
  },

  differenceBy: function () {

  },

  matches: function (source) {
    return function (obj) {
      for (var key in source) {
        if (obj[key] !== source[key]) {
          return false
        }
        return true
      }
    }
  },

  matchesProperty: function (pairs) {
    return this.matches(fromPairs(pairs))
  },

  fromPairs: function (pairs) {

  },

  toPairs: function (pairs) {

  },

  add: function (augend, addend) {
    return augend + addend
  },

  ceil: function (number, precision = 0) {
    return Math.ceil(number * 10 ** precision) / 10 ** precision
  },

  divide: function (dividend, divisor) {
    return dividend / divisor
  },

  floor: function (number, precision = 0) {
    return Math.floor(number * 10 ** precision) / 10 ** precision
  },

  max: function (array) {
    return jihao9325.maxBy(array)
  },

  maxBy: function (array, iteratee = jihao9325.identity) {
    if (array == false) {return undefined}
    if (typeof iteratee == "string") {
      iteratee = jihao9325.property(iteratee)
    }
    var res
    array.reduce(function (result, item, index) {
      var val = iteratee(item)
      if (result <= val) {
        result = val
        res = item        
      }
      return result
    }, -Infinity)
    return res
  },

  mean: function (array) {
    return this.meanBy(array)
  },

  meanBy: function (array, iteratee = jihao9325.identity) {
    if (array == false) {return undefined}
    if (typeof iteratee == "string"){
      iteratee = jihao9325.property(iteratee)
    }
    return array.reduce(function(result, item) {
      result += iteratee(item)
      return result
    }, 0) / array.length
  },

  min: function (array) {
    return jihao9325.minBy(array)
  },

  minBy: function (array, iteratee = jihao9325.identity) {
    if (array == false) {return undefined}
    if (typeof iteratee == "string") {
      iteratee = jihao9325.property(iteratee)
    }
    var res
    array.reduce(function (result, item, index) {
      var val = iteratee(item)
      if (result >= val) {
        result = val
        res = item        
      }
      return result
    }, Infinity)
    return res
  },

  multiply: function (multiplier, multiplicand) {
    return multiplier * multiplicand
  },

  round: function (number, precision) {
    return Math.round(number * 10 ** precision) / 10 ** precision
  },

  subtract: function (minuend, subtrahend) {
    return minuend - subtrahend
  },

  sum: function (array) {
    return jihao9325.sumBy(array)
  },

  sumBy: function (array, iteratee = jihao9325.identity) {
    if (typeof iteratee == 'string') {
      iteratee = jihao9325.property(iteratee)
    }
    return array.reduce(function(result, item) {
      result += iteratee(item)
      return result
    }, 0)
  },

  clamp: function (number, lower, upper) {
    if (arguments.length == 1) {
      return number
    }
    if (arguments.length == 2) {
      number = arguments[0]
      lower = undefined
      upper = arguments[1]
    }
    lower = (lower === null ? 0 : lower)
    upper = (upper === null ? 0 : upper)
    if (lower === undefined && upper === undefined) {
      return number
    }
    if (lower === undefined) {
      return Math.min(number, upper)
    }
    if (upper === undefined) {
      return Math.max(number, lower)
    }
    return Math.max(lower, Math.min(number, upper))
  },

  inRange: function (number, start = 0, end) {
      if (arguments.length == 2) {
        start = 0
        end = arguments[1]
      }
      if (start > end) {
        let temp = end
        end = start
        start = temp
      }
      if (number >= start && number < end) {
        return true
      }
      return false
  },

  random: function (lower = 0, upper = 1, floating = false) {
    if (arguments.length == 1) {
      if (typeof arguments[0] == "boolean") {
        lower = 0
        upper = 1
        floating = arguments[0]
      } else {
        lower = 0
        upper = arguments[0]
      }
    }
    if (arguments.length == 2) {
      if (typeof arguments[1] == "boolean") {
        lower = 0
        upper = arguments[0]
        floating = arguments[1]
      } else {
        lower = arguments[0]
        upper = arguments[1]
      }
    }

    if (floating || (lower != parseInt(lower)) || (upper != parseInt(upper))) {
      return (Math.random() && (1-Math.random())) * (upper - lower) + lower
      //how to touch upper?
    } else {
      return Math.floor(Math.random() * (upper - lower + 1)) + lower
    }
  },

  flow: function (funcs) {
    return function(...vals) {
      return funcs.reduce(function(acc, item) {
        return item(acc)
      }, funcs.shift()(...vals))
    }
  },

  


}