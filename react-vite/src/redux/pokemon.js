import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    pokemons: [],
    pokemonDetails: null,
    loading: false,
    errors: null
}

// export const getAllPokemon = createAsyncThunk(
//     "pokemon/getAllPokemon",
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await fetch('/api/pokemon')
//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(`Error getting pokemon: ${data.message}`);
//             }
//             return data;
//         } catch (error) {
//             return rejectWithValue(error.message || 'Error fetching all pokemon data')
//         }
//     }
// )

export const getAllPokemon = createAsyncThunk(
    "pokemon/getAllPokemon",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/pokemon');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error getting pokemon: ${data.message}`);
            }
            return data; // The data should be returned as-is since it contains 'Pokemon'
        } catch (error) {
            return rejectWithValue(error.message || 'Error fetching all pokemon data');
        }
    }
)



const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPokemon.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getAllPokemon.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getAllPokemon.fulfilled, (state, action) => {
                console.log('ACTION PAYLOAD!!!!!!:', action.payload); // Add this line
                state.loading = false;
                state.pokemons = action.payload.Pokemon || [];
            })
                        
    }
})

export default pokemonSlice.reducer;