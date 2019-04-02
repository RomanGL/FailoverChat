import { SET_NAME } from '../actions/UserActions'

const initialState = {
  name: '',
}

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload }

    default:
      return state
  }
}
