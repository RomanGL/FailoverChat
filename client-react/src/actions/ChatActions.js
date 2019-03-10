export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST'
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS'
export const SEND_MESSAGE_FAIL = 'SEND_MESSAGE_FAIL'

export const RECEIVED_MESSAGE = 'RECEIVED_MESSAGE'

let idCounter = 0

export function sendMessage(message) {
  return (dispatch, getState) => {
    idCounter++

    dispatch({
      type: SEND_MESSAGE_REQUEST,
      payload: {
        user: {
          name: 'Unknown',
        },
        content: message,
        id: idCounter,
      },
    })

    const socket = getState().socket.connection.socket
    socket.emit('message', {
      user: {
        name: 'Unknown',
      },
      content: message,
      id: idCounter,
    })
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
