import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { restoreUser } from "../../redux/session";
import { fetchPokemonDetail, deleteUserPokemon } from "../../redux/pokemon";
import { useModal } from '../../context/Modal';
import EditPokemonModal from "./EditPokemonModal";



function UserPokemonDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();
    const pokemons = useSelector((state) => state.pokemon);
    const currentUser = useSelector((state) => state.session.user);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) {
            dispatch(restoreUser());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true);
            dispatch(fetchPokemonDetail(id)).finally(() => {
                setIsLoading(false);
            });
        }
    }, [dispatch, currentUser, id]);

    const handleEditPokemon = (pokemon) => {
        setModalContent(<EditPokemonModal pokemon={pokemon} />);
        // dispatch(fetchPokemonDetail(pokemon.id))
    };    

    const handleDeletePokemon = async (pokemonId) => {
        try {
            const result = await dispatch(deleteUserPokemon(pokemonId)).unwrap();
            alert(result.message || "Pokémon deleted successfully!");
            navigate("/pokemon/collection");
        } catch (error) {
            console.error("Error deleting Pokémon:", error); // Log the error for debugging
            alert(
                typeof error === 'string'
                    ? error
                    : "Failed to delete Pokémon. Please try again."
            );
        }
    };
    

    const pokemonList = pokemons.pokemons ? Object.values(pokemons.pokemons) : [];

    if (isLoading) {
        return <p>Loading Pokémon details...</p>;
    }

    return (
        <div>
            <h1>Pokemon Details</h1>
            {pokemonList.length === 0 ? (
                <p>No Pokémon found.</p>
            ) : (
                pokemonList.map((pokemonDetail) => (
                    <div key={pokemonDetail.id}>
                        <h2>{pokemonDetail.nickname || "Unnamed Pokémon"}</h2>
                        <img
                            src={pokemonDetail.pokemon?.image || "placeholder-image-url"}
                            alt={pokemonDetail.pokemon?.name || "Unknown Pokémon"}
                        />
                        <p>
                            <strong>Level:</strong> {pokemonDetail.level || "N/A"}
                        </p>
                        <p>
                            <strong>Pokemon Name:</strong> {pokemonDetail.pokemon?.name || "Unknown"}
                        </p>
                        <p>
                            <strong>Custom Moves:</strong> 
                            {pokemonDetail.custom_moves
                                ? `${pokemonDetail.custom_moves.move1 || "N/A"} / ${pokemonDetail.custom_moves.move2 || "N/A"}`
                                : "No moves available"}
                        </p>
                        <p>
                            <strong>Types:</strong> 
                            {pokemonDetail.pokemon?.types
                                ? pokemonDetail.pokemon.types.join(", ")
                                : "Unknown"}
                        </p>
                        <button onClick={() => handleEditPokemon(pokemonDetail)}>
                            Edit Pokemon
                        </button>
                        <button onClick={() => handleDeletePokemon(pokemonDetail.id)}>
                            Delete Pokemon
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}

export default UserPokemonDetails;

