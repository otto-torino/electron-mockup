// a library to wrap and simplify api calls
import history from '../history'
import apisauce from 'apisauce'
import config from '../Config'

// our "constructor"
const create = (baseURL = config.apiBasePath) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    withCredentials: true,
    // 10 second timeout...
    timeout: 25000
  })

  // middleware to intercept network errors
  // @TODO find a way, maybe in a pre request middleware to
  // simulate request timeout
  api.addResponseTransform(response => {
    console.log(response)
    if (response.problem === 'NETWORK_ERROR') {
      history.push('/network-error')
    }
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.

  // this function is called on startup when a token is found in the locale storage
  // and it sets the token in the request headers

  // AUTHENTICATION stuff
  // do not send authentication in request headers, but rely only upon cookie authentication
  // because the token is not invalidated server side when performing a logout, so if an
  // user has multible tabs opened, logging out from one tab doesn't mean he will be
  // logged out also from other tabs, leading to a strange behaviour
  // const setAuthToken = token => api.setHeader('Authorization', 'JWT ' + token)
  // const removeAuthToken = () => api.setHeader('Authorization', '')
  const setAuthToken = token => {}
  const removeAuthToken = () => {}
  const whoami = () => api.get('whoami')
  // we need allowCredentials otherwise the cookies arriving from the response
  // won't be set! We need it only here, because all other requests will use
  // jwt authentication
  const login = (username, password) =>
    api.post('login', { username, password }, { withCredentials: true })
  // allowCredentials to unset cookie!
  const logout = () =>
    api.get('delete-jwt-cookie', {}, { withCredentials: true })
  const refreshToken = token =>
    api.post('refresh-token', { token }, { withCredentials: true })
  // PROFILE
  const profile = () => api.get('profile')
  const updateProfile = (profileId, data) => api.patch('/profile/' + profileId, data)

  // MOCKUPS
  const mockups = () => api.get('mockups')
  const mockup = mockupId => api.get('mockups/' + mockupId)
  const lastUpdates = () => api.get('last-revision-updates')
  const sendMail = (mockupId, data) =>
    api.post('mockups/' + mockupId + '/send_email', { ...data })
  const archivedMockups = () => api.get('archived-mockups')
  const archivedSendMail = (mockupId, data) =>
    api.post('archived-mockups/' + mockupId + '/send_email', { ...data })

  // COMMENTS
  const lastComments = () => api.get('last-comments')
  const comments = revisionId => api.get('comments/' + revisionId)
  const saveComment = (revisionId, comment) =>
    api.post('comments/' + revisionId, comment)
  const deleteComment = (revisionId, commentId) =>
    api.delete('comments/' + revisionId + '/' + commentId)
  const updateComment = (revisionId, commentId, commentData) =>
    api.patch('comments/' + revisionId + '/' + commentId, commentData)

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    setAuthToken,
    removeAuthToken,
    login,
    logout,
    refreshToken: refreshToken,
    whoami,
    profile,
    updateProfile,
    mockups,
    mockup,
    archivedMockups,
    archivedSendMail,
    lastUpdates,
    lastComments,
    sendMail,
    comments,
    saveComment,
    deleteComment,
    updateComment
  }
}

// let's return back our create method as the default.
export default {
  create
}
