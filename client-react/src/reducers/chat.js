import { RECEIVED_MESSAGE, SEND_MESSAGE_REQUEST } from '../actions/ChatActions'

const initialState = {
  messages: [],
}

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
    case RECEIVED_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }

    default:
      return state
  }
}
