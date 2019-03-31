import axios from 'axios'

export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL'

export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE'

export const GET_HISTORY_REQUEST = 'GET_HISTORY_REQUEST'
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS'
export const GET_HISTORY_FAIL = 'GET_HISTORY_FAIL'

export function sendMessage(message) {
  return (dispatch, getState) => {
    const messageId = Date.now()
    const msg = {
      user: {
        name: 'Unknown',
      },
      content: message,
      id: messageId,
    }

    dispatch({
      type: SEND_MESSAGE_REQUEST,
      payload: msg,
    })

    const socket = getState().socket.connection.socket
    socket.emit('message', msg)
  }
}

export function receiveMessage(message) {
  return dispatch => {
    dispatch({
      type: RECEIVED_MESSAGE,
      payload: message,
    })
  }
}

export function getHistory() {
  return (dispatch, getState) => {
    dispatch({
      type: GET_HISTORY_REQUEST,
    })

    const serverUrl = getState().socket.connection.server.url
    axios
      .get(serverUrl + '/history')
      .then(response => {
        dispatch({
          type: GET_HISTORY_SUCCESS,
          payload: response.data,
        })
      })
      .catch(error => {
        dispatch({
          type: GET_HISTORY_FAIL,
          error: true,
          payload: error,
        })
      })
  }
}
