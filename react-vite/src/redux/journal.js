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
            console.log("Backend response:", data); 
            if (!response.ok) {
                return rejectWithValue(data);
            }
            return data.journal;
        } catch (error) {
            console.error("Unexpected error:", error);
            return rejectWithValue(error.message || "Unknown error");
        }
    }
);

// export const fetchEntryById = createAsyncThunk(
//     "journal/fetchEntryById",
//     async (id, { rejectWithValue }) => {
//         try {
//             const response = await fetch(`/api/journal/${id}`);
//             const data = await response.json();
//             if (!response.ok) {
//                 return rejectWithValue("Error fetching journal entry");
//             }
//             return data;
//         } catch (error) {
//             console.log("fetchEntryById error:", error);
//             return rejectWithValue(error.message || "Error fetching entry");
//         }
//     }
// );

export const fetchEntryById = createAsyncThunk(
    "journal/fetchEntryById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/journal/${id}`);
            const data = await response.json();
            console.log("API Response:", data);
            if (!response.ok) {
                return rejectWithValue(data.error || "Error fetching journal entry");
            }
            return data;
        } catch (error) {
            console.error("fetchEntryById error:", error);
            return rejectWithValue(error.message || "Error fetching entry");
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
                state.journal = action.payload.journal || action.payload;
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
                state.journal = action.payload.journal || action.payload; 
                state.entryDetails = action.payload.entryDetails || null;
            })
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
                if (Array.isArray(state.journal)) {
                    state.journal.push(action.payload); 
                } else {
                    console.error("State journal is not an array:", state.journal);
                }
            })
            .addCase(fetchEntryById.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(fetchEntryById.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(fetchEntryById.fulfilled, (state, action) => {
                state.loading = false;
                state.entryDetails = action.payload;
            })
        }
});

export default journalSlice.reducer;
