import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    inbox: [],
    sentBox: [],
    deleteBox: [],
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


export const getDeletedMessages = createAsyncThunk(
    "/message/getDeletedMessages",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/messages/deleted', {
                method: 'GET'
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error getting user deleted messages: ${data.message}`);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Error fetching deleted messages");
        }
    }
)


export const sendMessage = createAsyncThunk(
    "message/sendMessage",
    async (messageData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/messages/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(messageData),
            });
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data);
            }
            return data.sent_message;
        } catch (error) {
            return rejectWithValue(error.message || "Error sending direct message");
        }
    }
);


export const deleteMessage = createAsyncThunk(
    "message/deleteMessage",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/messages/inbox/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error deleting review: ${data.message}`);
            }
            return data.deleted_message || id;
        } catch (error) {
            return rejectWithValue(error.message || "Error deleting user review");
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
            .addCase(getDeletedMessages.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getDeletedMessages.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getDeletedMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.deleteBox = action.payload;
            })
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.loading = false;
                if (Array.isArray(state.sentBox)) {
                    state.sentBox.push(action.payload);
                } else {
                    console.error("State sentBox is not an array", state.sentBox)
                }
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                const messageId = action.payload; // This should be the message ID
            
                if (messageId) {
                    const deletedMessage = state.inbox.find((message) => message.id === messageId);
            
                    if (deletedMessage) {
                        // Remove the message from the inbox
                        state.inbox = state.inbox.filter((message) => message.id !== messageId);
            
                        // Add the message to the deleteBox
                        state.deleteBox.push(deletedMessage);
                    }
                } else {
                    console.error("deleteMessage.fulfilled: action.payload is undefined");
                }
            });
            
    }
})

export default MessageSlice.reducer;