const CommentsService = {
  saveVisit: function (revisionId) {
    let savedVisits = window.localStorage.getItem('commentsVisits')
    if (!savedVisits) {
      savedVisits = {}
    } else {
      savedVisits = JSON.parse(savedVisits)
    }

    savedVisits[revisionId] = new Date().getTime()
    window.localStorage.setItem('commentsVisits', JSON.stringify(savedVisits))
  },
  getVisit: function (revisionId) {
    let savedVisits = window.localStorage.getItem('commentsVisits')
    if (savedVisits) {
      savedVisits = JSON.parse(savedVisits)
      return savedVisits[revisionId] || null
    }
    return null
  },
  get: function () {
    let savedVisits = window.localStorage.getItem('commentsVisits')
    if (savedVisits) {
      return JSON.parse(savedVisits)
    }
    return {}
  }
}

export default CommentsService
