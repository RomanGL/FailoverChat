import { combineReducers } from 'redux'
import { userReducer } from './user'
import { chatReducer } from './chat'
import { socketReducer } from './socket'

export const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  socket: socketReducer,
})
