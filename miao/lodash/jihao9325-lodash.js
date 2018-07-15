var jihao9325 = {
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

  








}