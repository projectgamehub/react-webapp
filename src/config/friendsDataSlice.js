import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FRIENDS_SERVICE_URL } from "../utils/constant";
import axios from "axios";

const initialState = {
    friendList: null,
    friendListLoading: true,
    friendListError: false,
    incomingRequestList: null,
    incomingRequestListLoading: true,
    incomingRequestListError: false
};

export const fetchFriendList = createAsyncThunk(
    "fetchFriendList",
    async (_, { getState }) => {
        const friendList = getState()?.friendsDataSlice?.friendList;
        if (friendList != null) {
            return friendList;
        }

        const accessToken = getState().userDataSlice.accessToken;
        if (!accessToken) {
            throw new Error("User not logged in");
        }

        const response = await axios.get(
            FRIENDS_SERVICE_URL + "/get-my-friend-list",
            {
                headers: {
                    "access-token": accessToken
                }
            }
        );

        return response?.data?.data;
    }
);

export const fetchIncomingRequestList = createAsyncThunk(
    "fetchIncomingRequestList",
    async (_, { getState }) => {
        const incomingRequestList =
            getState()?.friendsDataSlice?.incomingRequestList;
        if (incomingRequestList != null) {
            return incomingRequestList;
        }

        const accessToken = getState().userDataSlice.accessToken;
        if (!accessToken) {
            throw new Error("User not logged in");
        }

        const response = await axios.get(
            FRIENDS_SERVICE_URL + "/get-friend-request-list",
            {
                headers: {
                    "access-token": accessToken
                }
            }
        );

        return response?.data?.data;
    }
);

export const friendsDataSlice = createSlice({
    name: "friendsData",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchFriendList.pending, (state) => {
                state.friendListLoading = true;
                state.friendListError = null;
            })
            .addCase(fetchFriendList.fulfilled, (state, action) => {
                state.friendListLoading = false;
                state.friendList = action.payload;
                state.friendListError = null;
            })
            .addCase(fetchFriendList.rejected, (state, action) => {
                state.friendListLoading = false;
                state.friendListError = action.error.message;
            })
            .addCase(fetchIncomingRequestList.pending, (state) => {
                state.incomingRequestListLoading = true;
                state.incomingRequestListError = null;
            })
            .addCase(fetchIncomingRequestList.fulfilled, (state, action) => {
                state.incomingRequestListLoading = false;
                state.incomingRequestList = action.payload;
                state.incomingRequestListError = null;
            })
            .addCase(fetchIncomingRequestList.rejected, (state, action) => {
                state.incomingRequestListLoading = false;
                state.incomingRequestListError = action.error.message;
            });
    }
});

export default friendsDataSlice.reducer;