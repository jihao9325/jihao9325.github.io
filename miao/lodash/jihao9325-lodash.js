var jihao9325 = {

/*---Util---*/
  identity: function (...value) {
    return value[0]
  },

  iteratee: function (func = jihao9325.identity) {
    if (Array.isArray(func)) {
      return jihao9325.matchesProperty(func)
    }
    if (typeof func == 'function') {
      return func
    }
    if (typeof func == 'string') {
      return this.property(func)
    }
    if (Object.prototype.toString.call(func) == '[object Object]') {
      return this.matches(func)
    }
  },

  property: function (path) {
    return function (obj) {
      return obj[path]
    }
  },

  propertyOf: function (object) {
    return funciton(path) {
      return jihao9325.get(object, path)
    }
  },

  bindAll: function (object, methodNames) {
    methodNames = Array.isArray(methodNames) ? methodNames : [methodNames]
    for (var item of methodNames) {
      object[item] = object[item].bind(object)
    }
    return object
  },

  range: function (start = 0, end, step = 1) {
    var len = arguments.length
    var result = []
    if (len == 0 || start == end) {return []}
    if (len == 1) {
      start = 0
      end = arguments[0]
    }
    if (end > start) {
      if (step < 0) {return []}
      if (step == 0) {
        for (var n = 0; n < end - start; n++) {
          result.push(start)
        }
        return result
      }
      for (var i = start; i < end; i += step) {
        result.push(i)
      }
      return result
    } else {
      step = (step == 1 && len <= 2) ? -1 : step
      if (step >= 0) {return []}
      for (var i = start; i > end; i += step) {
        result.push(i)
      }
      return result
    }
  },

  rangeRight: function (...vals) {
    return jihao9325.range(...vals).reverse()
  },

  toPath: function (value) {
    var result
    if (typeof value == 'number') {
      value = String(value)
    }
    result = value.split('[]').join('.').split('[').join('.').split('].').join('.').split('.')
    return result
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


/*---Array---*/
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

  difference: function (array, ...values) {
    return array.filter(function (item) {
      var ary = [].concat(...values)
      return ary.indexOf(item) == -1
    })
  },

  differenceBy: function () {

  },

  differenceWith: function () {

  },

  drop: function (array, n = 1) {
    n = Math.min(n, array.length)
    for (var i = 0; i < n; i++) {
      array.shift()
    }
    return array
  },

  dropRight: function (array, n = 1) {
    n = Math.min(array.length, n)
    for (var i = 0; i < n; i++) {
      array.pop()
    }
    return array
  },

  dropWhile: function (array, predicate = jihao9325.identity) {
    
  },

  dropRightWhile: function () {

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

  findIndex: function () {

  },

  findLastIndex: function () {

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

  flattenDeep: function (array) {
    return jihao9325.flattenDepth(array, Infinity)
  },

  flattenDepth: function flattenDepth(array, depth = 1) {
    if (depth == 0) {
      return array.slice()
    }
    return array.reduce(function (result, item) {
      if (Array.isArray(item)) {
        var tmp = flattenDepth(item, depth - 1)
        result = [...result, ...tmp]
      } else {
        result.push(item)
      }
      return result
    }, [])
  },

  head: function (array) {
    return array[0]
  },

  indexOf: function (array, value, fromIndex = 0) {
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  },

  initial: function (array) {
    array.pop()
    return array
  },

  intersection: function () {

  },

  intersectionBy: function () {

  },

  intersectionWith: function () {

  },

  join: function (array, separator = ',') {
    return array.reduce(function (result, item, index, array) {
      if (index == array.length - 1) {
        result = result + item
      } else {
        result = result + item + separator
      }
      return result
    },'')
  },

  last: function (array) {
    return array[array.length - 1]
  },

  lastIndexOf: function (array, value, fromIndex = array.length - 1) {
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] == value) {
        return i
      }
    }
    return -1
  },

  nth: function (array, n = 0) {
    if (n < 0) {
      n = array.length + n
    }
    return array[n]
  },

  //O(n2)
  pull: function (array, ...values) {
    for (var i = 0; i < array.length; i++) {
      for (var key of values) {
        if (array[i] == key) {
          array.splice(i, 1)
          i--
          break
        }
      }
    }
    return array
  },

  pullAll: function (array, values) {
    return jihao9325.pull(array, ...values)
  },

  pullAllBy: function (array, values, iteratee = jihao9325.identity) {
    iteratee = jihao9325.iteratee(iteratee)
    for (var item of values) {
      remove(array, key => iteratee(item) == iteratee(key))
    }
    return array
  },

  pullAllWith: function (array, values, comparator) {
    comparator = jihao9325.iteratee(comparator)
    for (var item of values) {
      this.remove(array, key => comparator(item, key))
    }
    return array
  },

  pullAt(array, ...indexes) {
    var val = jihao9325.flattenDeep(indexes)
    var pulled = []
    for (var i = 0; i < val.length; i++) {
      pulled.push(array.splice(val[i], 1)[0])
      if (i + 1 == val.length) {
        break
      }
      val[i+1]--
    }
    return pulled
  },

  remove: function (array, predicate = jihao9325.identity) {
    predicate = jihao9325.iteratee(predicate)
    for (var i = 0; i < array.length; i++) {
      if (predicate(array[i])) {
        result.push(array.splice(i, 1))
        i--
      }
    }
    return result 
  },

  reverse: function (array) {
    var len = array.length
    for (var i = 0; i < Math.floor(len / 2); i++) {
      var temp = array[i]
      array[i] = array[len - i - 1]
      array[len - i - 1] = temp
    }
    return array
  },

  sortedIndex: function (array, value) {

  },

  sortedIndexBy: function (array, value, iteratee = jihao9325.identity) {

  },

  sortedIndexOf: function (array, value) {

  },

  sortedLastIndex: function (array, value) {

  },

  sortedLastIndexBy: function (array, value, iteratee = jihao9325.identity) {

  },

  sortedLastIndexOf: function (array, value) {

  },

  sortedUniq: function (array) {

  },

  sortedUniqBy: function (array, iteratee) {

  },

  tail: function (array) {
    array.shift()
    return array
  },

  take: function (array, n = 1) {
    return array.slice(0, n)
  },

  takeRight: function (array, n = 1) {
    var len = array.length
    n = n > len ? len : n
    return array.slice(len - n, len)
  },

  takeRightWhile: function (array, predicate = jihao9325.identity) {

  },

  takeWhile: function (array, predicate = jihao9325.identity) {

  },

  union: function (arrays) {

  },

  unionBy: function (arrays, iteratee = jihao9325.identity) {

  },

  unionWith: function (arrays, comparator) {

  },

  uniq: function (array) {

  },

  uniqBy: function (array, iteratee = jihao9325.identity) {

  },

  uniqWith: function (array, comparator) {

  },

  unzip: function (array) {

  },

  unzipWith: function (array, iteratee = jihao9325.identity) {

  },

  without: function (array, values) {

  },

  xor: function (arrays) {

  },

  xorBy: function (arrays, iteratee = jihao9325.identity) {

  },

  xorWith: function (arrays, comparator) {

  },

  zip: function (arrays) {

  },

  zipObject: function (props = [], values = []) {

  },

  zipObjectDeep: function (props = [], values = []) {

  },

  zipWith: function (arrays, iteratee = jihao9325.identity) {

  },


/*---Collection---*/
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

  fromPairs: function (pairs) {
    var result = {}
    pairs.forEach(function(item) {result[item[0]] = item[1]})
    return result
  },

  toPairs: function (pairs) {
    return Object.entries(pairs)
  },

/*---Math---*/
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

  round: function (number, precision = 0) {
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

/*---Number---*/
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

/*---Object---*/
get: function (object, path, defaultValue) {
  var result = object
  path = jihao9325.toPath(path)
  for (var key of path) {
    if (result) {
      result = result[key]
    }
  }
  return result == undefined ? defaultValue : result
},

/*---String---*/
lowerCase: function (string = '') {

},

lowerFirst: function (string = '') {
  
},

upperCase: function (string = '') {

},

upperFirst: function (string = '') {

},

words: function () {

},

/*---Function---*/
  ary: function (func, n = func.length) {
    return function (...vals) {
      return func(...vals.slice(0, n))
    }
  },

  unary: function (func) {
    return this.ary(func, 1)
  },

  negate: function () {

  },

  bind: function (func, thisArg, ...fixedArgs) {
    return function (...restArgs) {
      return func.apply(this.Arg, [...fixedArgs, ...restArgs])
    }
  },

}