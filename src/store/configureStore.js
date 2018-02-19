import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import gifsReducer from '../reducers/gifs-reducer'

// config to use redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default () => {
  const store = createStore(
    combineReducers({
      gifs: gifsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  )

  return store
}
