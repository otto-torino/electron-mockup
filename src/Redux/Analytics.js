import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updatePositions: ['message'],
  disconnectUser: ['message']
})

export const AnalyticsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  positions: {}
}

/* ------------- Reducers ------------- */

export const updatePositions = (state, { message }) => {
  let userPositions = Object.assign({}, state.positions[message.user])
  userPositions[message.clientId] = message.pathname
  return Object.assign({}, state, {
    positions: Object.assign({}, state.positions, {[message.user]: userPositions})
  })
}

export const disconnectUser = (state, { message }) => {
  let positions = Object.assign({}, state.positions)
  delete positions[message.user][message.clientId]
  if (Object.keys(positions[message.user]).length === 0) {
    delete positions[message.user]
  }
  return Object.assign({}, state, {
    positions: positions
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_POSITIONS]: updatePositions,
  [Types.DISCONNECT_USER]: disconnectUser
})
