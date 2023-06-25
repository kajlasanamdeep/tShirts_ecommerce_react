import { configureStore } from "@reduxjs/toolkit";
import { credentialsSlice } from "store/slice/CredentialsSlice";
import { personalDetailsSlice } from "store/slice/PersonalDetailsSlice";

const store = configureStore({
    reducer: {
        credentialsReducer: credentialsSlice.reducer,
        personalDetailsReducer: personalDetailsSlice.reducer,
    },
});

export type StoreModel = ReturnType<typeof store.getState>;

export default store;
