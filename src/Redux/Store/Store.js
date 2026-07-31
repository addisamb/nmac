import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import combineReducer from '../Reducer/index'
import { persistStore, persistReducer, createTransform } from "redux-persist";
import { applyMiddleware, createStore } from "redux";

const rootReducer = combineReducer

// Transient UI flags must never be persisted. `session` (session-expired modal),
// `plsLogin` and the loader flags were being written to AsyncStorage, so a modal
// or full-screen loader that was up when the app closed came back on next launch
// and could not be dismissed — effectively bricking the install until reinstall.
// They live inside AuthReducer/HomeReducer, so a root blacklist would also drop
// the auth token; a transform strips just these keys.
const TRANSIENT_KEYS = {
    AuthReducer: ['authLoader', 'plsLogin', 'session'],
    HomeReducer: ['homeLoader'],
};

const stripTransientFlags = createTransform(
    (inboundState, key) => {
        const drop = TRANSIENT_KEYS[key];
        if (!drop || !inboundState) return inboundState;
        const cleaned = { ...inboundState };
        drop.forEach(k => delete cleaned[k]);
        return cleaned;
    },
    (outboundState, key) => {
        const drop = TRANSIENT_KEYS[key];
        if (!drop || !outboundState) return outboundState;
        const restored = { ...outboundState };
        drop.forEach(k => { restored[k] = false; });
        return restored;
    },
    { whitelist: Object.keys(TRANSIENT_KEYS) },
);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    transforms: [stripTransientFlags],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const Store  = createStore(persistedReducer,{},applyMiddleware(thunk));

const Persistor = persistStore(Store)

export {Store,Persistor}