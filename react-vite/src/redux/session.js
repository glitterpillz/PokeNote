import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  loading: false,
  errors: null,
};

export const restoreUser = createAsyncThunk(
  "session/restoreUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/session");
      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Trouble getting current user");
    }
  }
);

export const login = createAsyncThunk(
  "session/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw { errors: data.errors || { general: "Invalid login credentials"} };
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// export const signup = createAsyncThunk(
//   "session/signup",
//   async (
//     {
//       username,
//       email,
//       password,
//       fname,
//       lname,
//       admin,
//       pokemon_collection,
//       profile_picture
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username,
//           email,
//           password,
//           fname,
//           lname,
//           admin,
//           pokemon_collection,
//           profile_picture
//         }),
//       });
//       console.log("res:", res);
//       const data = await res.json();

//       if (!res.ok) {
//         return rejectWithValue(data);
//       }

//       console.log("data:", data);
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message || "Signup failed");
//     }
//   }
// );


export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    try {
      await fetch("/api/auth/logout");
      return;
    } catch (error) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restoreUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(restoreUser.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(restoreUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      // .addCase(signup.pending, (state) => {
      //   state.loading = true;
      //   state.errors = null;
      // })
      // .addCase(signup.rejected, (state, action) => {
      //   state.loading = false;
      //   state.errors = action.payload;
      // })
      // .addCase(signup.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.user = action.payload;
      // })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
  },
});


export default sessionSlice.reducer;