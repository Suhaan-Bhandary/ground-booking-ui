import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { eventApi } from "./features/eventsApi";
import { userApi } from "./features/userApi";
import userStateReducer from "./features/userSlice";
import { registrationApi } from "./features/registrationApi";

export const store = configureStore({
  reducer: {
    userState: userStateReducer,
    [userApi.reducerPath]: userApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [registrationApi.reducerPath]: registrationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      eventApi.middleware,
      registrationApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
