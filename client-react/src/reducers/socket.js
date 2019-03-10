import {
  SERVER_CONNECT_REQUEST,
  SERVER_CONNECT_SUCCESS,
  SERVER_CONNECT_FAIL,
} from '../actions/SocketActions'

export const CONNECTION_STATE_CONNECTING = 'CONNECTING'
export const CONNECTION_STATE_CLOSED = 'CLOSED'
export const CONNECTION_STATE_ERROR = 'ERROR'
export const CONNECTION_STATE_ALIVE = 'ALIVE'

const initialState = {
  connection: {
    server: null,
    socket: null,
  },
  state: CONNECTION_STATE_CLOSED,
}

export function socketReducer(state = initialState, action) {
  switch (action.type) {
    case SERVER_CONNECT_REQUEST:
      return {
        ...state,
        state: CONNECTION_STATE_CONNECTING,
        connection: action.payload,
      }

    case SERVER_CONNECT_FAIL:
      return {
        ...state,
        state: CONNECTION_STATE_ERROR,
        connection: action.payload,
      }

    case SERVER_CONNECT_SUCCESS:
      return {
        ...state,
        state: CONNECTION_STATE_ALIVE,
        connection: action.payload,
      }

    default:
      return state
  }
}
