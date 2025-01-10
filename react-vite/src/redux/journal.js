import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    journal: [],
    entryDetails: null,
    loading: false,
    errors: null
}


export const getAllEntries = createAsyncThunk(
    "journal/getAllEntries",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/journal", {
                method: 'GET'
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error getting journal entries: ${data.message}`);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Error fetching all journal entries")
        }
    }
)


export const getUserJournal = createAsyncThunk(
    "journal/getUserJournal",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/journal/user");
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data);
            }
            return data;
        } catch (error) {
            console.error("getUserJournal error:", error);
            return rejectWithValue(error.message || "Error fetching user journal")
        }
    }
)

export const createJournalEntry = createAsyncThunk(
    "journal/createJournalEntry",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/journal/post', { method: 'POST', body: formData });
            const data = await response.json();
            console.log("Backend response:", data);  // Log the API response
            if (!response.ok) {
                return rejectWithValue(data);
            }
            return data.journal;  // Ensure this returns the expected structure
        } catch (error) {
            console.error("Unexpected error:", error);
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);



const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllEntries.pending, (state) => {
                state.loading = true;
                state.errors = false;
            })
            .addCase(getAllEntries.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.message || action.payload;
            })
            .addCase(getAllEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload.journal || action.payload;  // Ensure consistency of the data structure
            })
            .addCase(getUserJournal.pending, (state) => {
                state.loading = true;
                state.errors = false;
            })
            .addCase(getUserJournal.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload.message || action.payload;
            })
            .addCase(getUserJournal.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload.journal || action.payload;  // Handle structure correctly
                state.entryDetails = action.payload.entryDetails || null;  // Handle entryDetails if necessary
            })
            // .addCase(createJournalEntry.pending, (state) => {
            //     state.loading = true;
            //     state.errors = false;
            // })
            // .addCase(createJournalEntry.rejected, (state, action) => {
            //     state.loading = false;
            //     state.errors = action.payload.message || action.payload;
            // })
            // .addCase(createJournalEntry.fulfilled, (state, action) => {
            //     state.loading = false;
            //     if (action.payload) {
            //         state.journal.push(action.payload);  // Add new entry to the journal
            //     }
            // });
            .addCase(createJournalEntry.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(createJournalEntry.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(createJournalEntry.fulfilled, (state, action) => {
                state.loading = false;
                console.log("New journal entry payload:", action.payload); // Log payload
                if (Array.isArray(state.journal)) {
                    state.journal.push(action.payload);  // Safely push if it's an array
                } else {
                    console.error("State journal is not an array:", state.journal);
                }
            });
                }
});

export default journalSlice.reducer;
