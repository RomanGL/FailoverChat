import { CONNECTION_STATE_ALIVE } from '../reducers/socket'
import { sendMessageWithAction, MESSAGE_ACTIONS } from '../actions/ChatActions'

export const SET_NAME = 'SET_NAME'

export function setName(name) {
  return (dispatch, getState) => {
    const oldName = getState().user.name
    dispatch({
      type: SET_NAME,
      payload: name,
    })

    const isConnectionAlive = getState().socket.state === CONNECTION_STATE_ALIVE
    if (isConnectionAlive) {
      dispatch(sendMessageWithAction(oldName, MESSAGE_ACTIONS.RENAME))
    }
  }
}
