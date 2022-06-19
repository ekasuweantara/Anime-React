import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['collections']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware())
const persistor = persistStore(store)

export{persistor}
export default store
// import { createStore } from 'redux'

// const initialState = {
//   sidebarShow: false,
//   isShowSpinner: false,
//   toast: {
//     isShow: false,
//     type: '',
//     msg: ''
//   }
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)

// export default store
