import { combineReducers } from 'redux'
import { userReducer } from './user'
import { chatReducer } from './chat'

export const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
})
