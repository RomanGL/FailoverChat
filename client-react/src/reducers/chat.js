import { RECEIVED_MESSAGE, SEND_MESSAGE } from '../actions/ChatActions'

const initialState = {
  messages: [
    {
      user: {
        name: 'User 1',
      },
      id: 0,
      content: 'Hello!',
    },
    {
      user: {
        name: 'User 2',
      },
      id: 1,
      content: 'Hello you too!',
    },
  ],
}

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE:
    case RECEIVED_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }

    default:
      return state
  }
}
