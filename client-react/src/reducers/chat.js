import {
  RECEIVED_MESSAGE,
  SEND_MESSAGE_REQUEST,
  GET_HISTORY_SUCCESS,
  GET_HISTORY_REQUEST,
  GET_HISTORY_FAIL,
} from '../actions/ChatActions'

const initialState = {
  messages: [],
  history: {
    isFetching: false,
    error: '',
  },
}

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
    case RECEIVED_MESSAGE:
      return { ...state, messages: [...state.messages, action.payload] }

    case GET_HISTORY_REQUEST:
      return {
        ...state,
        history: {
          isFetching: true,
          error: '',
        },
      }

    case GET_HISTORY_FAIL:
      return {
        ...state,
        history: {
          isFetching: false,
          error: action.payload.message,
        },
      }

    case GET_HISTORY_SUCCESS:
      return {
        ...state,
        messages: mergeMessagesHistory(state.messages, action.payload),
        history: {
          isFetching: false,
          error: '',
        },
      }

    default:
      return state
  }
}

function mergeMessagesHistory(actualMesssages, historyMessages) {
  const result = actualMesssages
    .concat(historyMessages)
    .filter((item, index, self) => {
      const i = self.findIndex(m => {
        return m.id === item.id
      })
      return index === i
    })
    .sort(compareMessages)

  return result
}

function compareMessages(a, b) {
  if (a.id === b.id) {
    return 0
  } else {
    return a.id > b.id ? 1 : -1
  }
}
