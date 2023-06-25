import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPersonalDetails } from "models/store/PersonalDetailsSliceModel";

const initialState: IPersonalDetails = {
    _id: null,
    email: null,
    role: null,
    userName: null,
    isBlocked: null,
    createdAt: null,
};

export const personalDetailsSlice = createSlice({
    name: "personalDetailsSlice",
    initialState,
    reducers: {
        setData(
            state,
            action: PayloadAction<{
                _id: string;
                email: string;
                role: string;
                userName: string;
                isBlocked: boolean;
                createdAt: string;
            }>
        ) {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.userName = action.payload.userName;
            state.isBlocked = action.payload.isBlocked;
            state.createdAt = action.payload.createdAt;
        },
        resetData(state) {
            state._id = null;
            state.email = null;
            state.role = null;
            state.userName = null;
            state.isBlocked = null;
            state.createdAt = null;
        },
    },
});
