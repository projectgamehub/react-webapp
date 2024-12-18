import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_SERVICE_URL } from "../utils/constant";

const initialState = {
    otherUsersData: {}
};

export const fetchUsernameFromId = createAsyncThunk(
    "fetchUsernameFromId",
    async (userId, { getState }) => {
        const otherUsersData = getState().otherUsersDataSlice.otherUsersData;

        if (otherUsersData[userId]?.username) {
            return {
                userId,
                data: { username: otherUsersData[userId].username || null }
            };
        }

        try {
            const response = await axios.get(
                `${USER_SERVICE_URL}/get-username-by-id/${userId}`
            );
            return {
                userId,
                data: { username: response?.data?.data?.username || null }
            };
        } catch (error) {}
    }
);

export const fetchAvatarURLFromId = createAsyncThunk(
    "fetchAvatarURLFromId",
    async (userId, { getState }) => {
        const otherUsersData = getState().otherUsersDataSlice.otherUsersData;

        if (otherUsersData[userId]?.avatarURL !== undefined) {
            return {
                userId,
                data: { avatarURL: otherUsersData[userId].avatarURL }
            };
        }

        try {
            const response = await axios.get(
                `${USER_SERVICE_URL}/get-avatar-url/${userId}`
            );

            return {
                userId,
                data: { avatarURL: response?.data?.data?.avatar || null }
            };
        } catch (error) {}
    }
);

const otherUsersDataSlice = createSlice({
    name: "otherUsersData",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsernameFromId.fulfilled, (state, action) => {
                if (action.payload) {
                    const { userId, data } = action.payload;
                    state.otherUsersData[userId] = {
                        ...state.otherUsersData[userId],
                        ...data
                    };
                }
            })
            .addCase(fetchAvatarURLFromId.fulfilled, (state, action) => {
                if (action.payload) {
                    const { userId, data } = action.payload;
                    state.otherUsersData[userId] = {
                        ...state.otherUsersData[userId],
                        ...data
                    };
                }
            });
    }
});

export default otherUsersDataSlice.reducer;
