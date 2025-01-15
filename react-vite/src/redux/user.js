import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userProfile: null,
    loading: false,
    errors: null
};

export const getAllUsers = createAsyncThunk(
    "user/getAllUsers",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch('/api/users/all', {
                method: 'GET',
                credentials: 'include',
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || `Error ${res.status}`);
            }

            const data = await res.json();
            return data.users;
            
        } catch (error) {
            console.error("Error fetching users:", error);
            return rejectWithValue(error.message);
        }
    }
);



export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (id, { rejectWithValue }) => {
        try {
            const res = await fetch(`/api/users/${id}/profile`);
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "User profile couldn't be found");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload || [];
            })
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.userProfile = action.payload;
            });
    }
})

export default userSlice.reducer;