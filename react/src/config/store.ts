import { combineReducers, configureStore} from "@reduxjs/toolkit" 
import { FLUSH, PAUSE, PERSIST, persistReducer, REGISTER, REHYDRATE} from "redux-persist"
import storage from "redux-persist/lib/storage"
import UserReducer from "../reducer/user.reducer"
import persistStore from "redux-persist/es/persistStore"

const rootReducer = combineReducers({
    user:UserReducer
})

const persistConfig ={
    key :"root",
    storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer)

//store
const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
        serializableCheck:{
            ignoredActions:[FLUSH,REHYDRATE,PAUSE,PERSIST,REGISTER]
        }
    })
})

export const persistor = persistStore(store)

export type RootsState = ReturnType<typeof store.getState>
export type  AppDispatch = typeof store.dispatch
export default store