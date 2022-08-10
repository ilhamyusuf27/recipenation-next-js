import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// import reducer
import auth from "./auth";
import register from "./register";

const persistConfig = {
	key: "recipenation",
	storage,
	whitelist: ["auth"],
};

const rootReducer = combineReducers({ auth, register });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
