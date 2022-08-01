import { createStore, applyMiddleware } from 'redux' //aparender a usar configureStore !!!
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
