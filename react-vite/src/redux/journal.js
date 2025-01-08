import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    journal: [],
    entryDetails: null,
    loading: false,
    errors: null
}

// export const getUserJournal = createAsyncThunk(
//     "journal/getUserJournal",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetch('/api/journal');
//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(`Error getting user journal: ${data.message}`);
//             }
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message || "Error fetching user journal");
//         }
//     }
// )


// export const getUserJournal = createAsyncThunk(
//     "journal/getUserJournal",
//     async (userId, { rejectWithValue }) => {
//         if (!userId) {
//             return rejectWithValue("User ID is required.");
//         }

//         try {
//             const response = await fetch(`/api/journal/${userId}`, {
//                 credentials: "include",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               });

//               const data = await response.json();
//               console.log("Response from API:", data); // Log response to see the data format

//               if (!response.ok) {
//                 throw new Error(data.error || "Failed to fetch journal entries");
//               }
              
//               // If no journal entries are found, return an empty array
//               return data.journal_entries || [data]; // Assuming `data` is a single journal entry object
//         } catch (error) {
//             return rejectWithValue(error.message || "Error fetching user journal");
//         }
//     }
// );

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
            })
    }
})

// const journalSlice = createSlice({
//     name: "journal",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(getUserJournal.pending, (state) => {
//                 console.log("Fetching journal entries...");
//                 state.loading = true;
//                 state.errors = null;
//             })
//             .addCase(getUserJournal.fulfilled, (state, action) => {
//                 console.log("Journal entries fetched:", action.payload);
//                 state.loading = false;
//                 state.journalEntries = action.payload;
//             })
//             .addCase(getUserJournal.rejected, (state, action) => {
//                 console.error("Error fetching journal entries:", action.payload);
//                 state.loading = false;
//                 state.errors = action.payload;
//             });
//     },
// });


export default journalSlice.reducer;