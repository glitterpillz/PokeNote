import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    pokemons: [],
    pokemonDetails: null,
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


export const addPokemonToCollection = createAsyncThunk(
    "pokemon/addPokemonToCollection",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/pokemon/${id}`, {
                method: "POST",
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error) || "Failed to add Pokemon to collection"
            }

            return data;
        } catch (error) {
            console.error("Error in addPokemonToCollection thunk:", error);
            return rejectWithValue(error.message || "Error adding Pokémon to collection");
        }
    }
);


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

// export const editUserPokemon = createAsyncThunk(
//     "pokemon/editUserPokemon",
//     async ({ id, payload }, { rejectWithValue }) => {
//         try {
//             console.log("Payload being sent to server:", payload); // Debugging payload

//             const response = await fetch(`/api/pokemon/collection/${id}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(payload),
//             });

//             const data = await response.json();
//             console.log("Server response:", data); // Debugging response

//             if (!response.ok) {
//                 throw new Error(data.error || 'Failed to update Pokémon');
//             }
//             return data.pokemon;
//         } catch (error) {
//             console.error("Error in thunk:", error.message); // Log errors
//             return rejectWithValue(error.message || "Error updating Pokémon");
//         }
//     }
// );


export const editUserPokemon = createAsyncThunk(
    "pokemon/editUserPokemon",
    async ({ id, payload }, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/pokemon/collection/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to update Pokémon');
            }
            return data.pokemon;
        } catch (error) {
            return rejectWithValue(error.message || "Error updating Pokémon")
        }
    }
)


export const deleteUserPokemon = createAsyncThunk(
    "pokemon/deleteUserPokemon",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/pokemon/collection/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete Pokémon');
            }
            return { id, message: data.message || 'Pokémon deleted successfully!' };
        } catch (error) {
            return rejectWithValue(error.message || "Error deleting Pokémon");
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
            .addCase(addPokemonToCollection.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(addPokemonToCollection.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(addPokemonToCollection.fulfilled, (state, action) => {
                state.loading = false;
                state.errors = null;
            
                if (action.payload && action.payload.pokemon) {
                    state.pokemons = [...state.pokemons, action.payload.pokemon];
                }
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
            })
            .addCase(editUserPokemon.pending, (state) => {
                state.loading = true;
                state.errors = null;
            })
            .addCase(editUserPokemon.rejected, (state, action) => {
                state.loading = false;
                state.errors = action.payload;
            })
            .addCase(editUserPokemon.fulfilled, (state, action) => {
                state.loading = false;
                state.pokemonDetails = action.payload;
            })
            .addCase(deleteUserPokemon.fulfilled, (state, action) => {
                console.log('Before deletion:', state.pokemons);
                state.pokemons = (Array.isArray(state.pokemons) ? state.pokemons : []).filter(
                    (pokemon) => pokemon.id !== action.payload.id
                );
                
                console.log('After deletion:', state.pokemons);
            });
            
            // .addCase(deleteUserPokemon.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.pokemons = state.pokemons.filter(
            //         (pokemon) => pokemon.id !== action.payload.id
            //     );
            // });
    }
})

export default pokemonSlice.reducer;