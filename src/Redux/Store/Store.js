import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import combineReducer from '../Reducer/index'
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware, createStore } from "redux";

const rootReducer = combineReducer

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store  = createStore(persistedReducer,{},applyMiddleware(thunk));

const Persistor = persistStore(Store)

export {Store,Persistor}