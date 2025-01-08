import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    pokemons: [],
    pokemonDetails: null,
    // userPokemons: [],
    loading: false,
    errors: null
}

export const getAllPokemon = createAsyncThunk(
    "pokemon/getAllPokemon",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/pokemon');
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error getting pokemon: ${data.message}`);
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || 'Error fetching all pokemon data');
        }
    }
)


export const getPokemonDetails = createAsyncThunk(
    "pokemon/getPokemonDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/pokemon/${id}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`Error getting pokemon by ID ${id}: ${data.message}`)
            }
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Error fetching pokemon by id")
        }
    }
)


export const getUserPokemon = createAsyncThunk(
    "pokemon/getUserPokemon",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("/api/pokemon/collection");
            const data = await response.json();
            if (!response.ok) {
                return rejectWithValue(data);
            }
            return data;
        } catch (error) {
            console.error("getUserPokemon error:", error);
            return rejectWithValue(error.message || "Error fetching user pokemon");
        }
    }
);

// export const fetchPokemonDetail = createAsyncThunk(
//     "pokemon/fetchPokemonDetail",
//     async (collectionId, { rejectWithValue }) => {
//         try {
//             const response = await fetch(`/api/pokemon/${collectionId}`);
//             const data = await response.json();
//             if (!response.ok) {
//                 return rejectWithValue(data);
//             }
//             return data;
//         } catch (error) {
//             console.error("fetchPokemonDetail error:", error);
//             return rejectWithValue(error.message || "Error fetching pokemon details")
//         }
//     }
// )

export const fetchPokemonDetail = createAsyncThunk(
    "pokemon/fetchPokemonDetail",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/pokemon/collection/${id}`);
            if (!response.ok) {
                const text = await response.text();
                console.error('Error response:', text);
                return rejectWithValue('Error fetching pokemon details');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("fetchPokemonDetail error:", error);
            return rejectWithValue(error.message || "Error fetching pokemon details");
        }
    }
);


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
                console.log('ACTION PAYLOAD!!!!!!:', action.payload);
                state.loading = false;
                state.pokemons = action.payload.Pokemon || [];
            })
            .addCase(getPokemonDetails.pending, (state) => {
                state.loading = true;
                state.errors = false;
            })   
            .addCase(getPokemonDetails.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })       
            .addCase(getPokemonDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemonDetails = action.payload;
            })
            .addCase(getUserPokemon.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(getUserPokemon.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(getUserPokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemons = action.payload;
            })
            .addCase(fetchPokemonDetail.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })    
            .addCase(fetchPokemonDetail.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(fetchPokemonDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemons = action.payload;
            });
    }
})

export default pokemonSlice.reducer;