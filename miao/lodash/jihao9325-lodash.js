var jihao9325 = {

  identity: function (...value) {
    return value[0]
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

  forEach: function (collection, action = identity) {
    for (var key in collection) {
      action(collection[key], key)
    }
    return
  },

  forEachRight: function (array, action = identity) {
    for (var i = array.length - 1; i >= 0; i--) {
      action(array[i], i, array)
    }
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

  sum: function (array) {
    var result = 0
    for (var i = 0; i < array.length; i++) {
      result += array[i]
    }
    return result
  },

  sumBy: function (array, iteratee) {
    var result = 0
    for (var i = 0; i < array.length; i++) {
      result += iteratee(array[i])
    }
    return result
  }












}