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
                state.errors = action.payload;
            })
            .addCase(getAllEntries.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload;
            })
            .addCase(getUserJournal.pending, (state) => {
                state.loading = true;
                state.errors = false;
            })
            .addCase(getUserJournal.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getUserJournal.fulfilled, (state, action) => {
                state.loading = false;
                state.journal = action.payload;
            });
    }
})

export default journalSlice.reducer;