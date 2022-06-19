import { combineReducers } from "redux";

import collectionReducer from "./Collections/reducer"
import basicReducer from "./Basic/reducer"

const rootReducer = combineReducers({
    collections: collectionReducer,
    basic: basicReducer
})

export default rootReducer
