import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICredentialsSlice } from "models/store/CredentialsSliceModel";

const initialState: ICredentialsSlice = {
    email: null,
    token: null,
    isLoggedIn: false,
};

export const credentialsSlice = createSlice({
    name: "credentialsSlice",
    initialState,
    reducers: {
        setData(
            state,
            action: PayloadAction<{
                email: string;
                token: string;
            }>
        ) {
            state.email = action.payload.email;
            state.token = action.payload.token;
            state.isLoggedIn = true;
        },
        resetData(state) {
            state.email = null;
            state.token = null;
            state.isLoggedIn = false;
        },
    },
});
