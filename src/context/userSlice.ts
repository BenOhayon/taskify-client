import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSliceData } from "../types/types";

const initialUserState: UserSliceData = {
    id: "",
    username: "",
    email: "",
    createdAt: -1
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserSliceData>) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.email = action.payload.email
            state.createdAt = action.payload.createdAt
        },
        resetUserData: (state) => {
            state.id = initialUserState.id
            state.username = initialUserState.username
            state.email = initialUserState.email
            state.createdAt = initialUserState.createdAt
        }
    }
})

export const { setUserData, resetUserData } = userSlice.actions
export default userSlice.reducer