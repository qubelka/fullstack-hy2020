import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import togglableReducer from './reducers/togglableReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  notification: notificationReducer,
  togglable: togglableReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
