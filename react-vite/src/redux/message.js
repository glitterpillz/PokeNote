import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    inbox: [],
    sentBox: [],
    messageDetails: null,
    loading: false,
    errors: null
}

export const getUserInbox = createAsyncThunk(
    "/message/getUserInbox",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/messages/inbox', {
                method: 'GET'
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error getting user inbox: ${data.message}`);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Error fetching inbox");
        }
    }
)

export const getUserSentBox = createAsyncThunk(
    "/message/getUserSentBox",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/messages/sent', {
                method: 'GET'
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error getting user sent box: ${data.message}`);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Error fetching sent box");
        }
    }
)   

const MessageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserInbox.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getUserInbox.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getUserInbox.fulfilled, (state, action) => {
                state.loading = false;
                state.inbox = action.payload;
            })
            .addCase(getUserSentBox.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getUserSentBox.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getUserSentBox.fulfilled, (state, action) => {
                state.loading = false;
                state.sentBox = action.payload;
            })
    }
})

export default MessageSlice.reducer;