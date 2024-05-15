import { configureStore } from "@reduxjs/toolkit";
import { tapestickApi } from "./features/api/api.service";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authSlice } from "./features/auth/auth.slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [tapestickApi.reducerPath]: tapestickApi.reducer,
      [authSlice.reducerPath]: authSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tapestickApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

// TODO
//setupListeners(store.dispatch);
