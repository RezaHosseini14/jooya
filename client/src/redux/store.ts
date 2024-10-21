import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import searchFilterSlice from "./slices/search.filter.slice";

const reducer = combineReducers({
  searchFilter: searchFilterSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") return getDefaultMiddleware().concat(logger);
    return getDefaultMiddleware();
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
