import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    userProfile: null,
    loading: false,
    errors: null
};

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
            })
    }
})

export default userSlice.reducer;