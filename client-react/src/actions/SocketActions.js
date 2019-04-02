import io from 'socket.io-client'
import {
  receiveMessage,
  getHistory,
  sendMessageWithAction,
  MESSAGE_ACTIONS,
} from './ChatActions'

export const SERVER_CONNECT_REQUEST = 'SERVER_CONNECT_REQUEST'
export const SERVER_CONNECT_SUCCESS = 'SERVER_CONNECT_SUCCESS'
export const SERVER_CONNECT_FAIL = 'SERVER_CONNECT_FAIL'

export const serversList = [
  {
    url: 'http://localhost:4000',
    isAlive: true,
  },
  {
    url: 'http://localhost:4001',
    isAlive: true,
  },
  {
    url: 'http://localhost:4002',
    isAlive: true,
  },
]

function getServerToConnect() {
  let alive = serversList.filter(server => server.isAlive)
  if (alive.length > 0) {
    return alive[0]
  } else {
    serversList.forEach(server => {
      server.isAlive = true
    })

    return serversList[0]
  }
}

export function socketConnect() {
  return dispatch => {
    const server = getServerToConnect()
    dispatch({
      type: SERVER_CONNECT_REQUEST,
      payload: {
        server: server,
        socket: null,
      },
    })

    const socket = io(server.url + '/client', {
      autoConnect: false,
      reconnection: false,
    })

    socket
      .on('connect', () => {
        dispatch({
          type: SERVER_CONNECT_SUCCESS,
          payload: {
            server: server,
            socket: socket,
          },
        })
        dispatch(getHistory())
        dispatch(sendMessageWithAction(null, MESSAGE_ACTIONS.JOINED))
      })
      .on('connect_error', () => {
        server.isAlive = false
        dispatch({
          type: SERVER_CONNECT_FAIL,
          payload: {
            server: server,
            socket: null,
          },
        })
      })
      .on('disconnect', () => {
        server.isAlive = false
        dispatch({
          type: SERVER_CONNECT_FAIL,
          payload: {
            server: server,
            socket: null,
          },
        })
      })
      .on('message', message => {
        dispatch(receiveMessage(message))
      })

    socket.open()
  }
}
