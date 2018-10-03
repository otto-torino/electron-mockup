const Tour = {
  setHomeComplete: function () {
    window.localStorage.setItem('tourHomeComplete', 1)
  },
  isHomeComplete: function () {
    return window.localStorage.getItem('tourHomeComplete') === '1'
  },
  setRevisionComplete: function () {
    window.localStorage.setItem('tourRevisionComplete', 1)
  },
  isRevisionComplete: function () {
    return window.localStorage.getItem('tourRevisionComplete') === '1'
  }
}

export default Tour
