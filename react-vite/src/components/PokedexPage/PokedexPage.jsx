import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../redux/session";
import * as pokemonActions from "../../redux/pokemon";
import Navigation from "../Navigation";
import pok from "./PokedexPage.module.css";

function PokedexPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const { pokemons, loading, errors } = useSelector((state) => state.pokemon);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

        if (pokemons.length === 0) {
            dispatch(pokemonActions.getAllPokemon());
        }
    }, [dispatch, pokemons]);

    const handleSearch = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/pokemon/search?query=${searchQuery}`);
        if (response.ok) {
            const results = await response.json();
            setSearchResults(results.Pokemon);
        } else {
            setSearchResults([]);
        }
    };

    const handleCardClick = (id) => {
        navigate(`/pokemon/${id}`);
    };

    if (loading || !isLoaded) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }

    const renderPokemonCards = (pokemonList) => {
        return pokemonList.map((pokemon) => (
            <div
                key={pokemon.id}
                className={pok.pokemonCard}
                onClick={() => handleCardClick(pokemon.id)} 
                style={{ cursor: "pointer" }} 
            >
                <img src={pokemon.image} alt={pokemon.name} />
                <h3>{pokemon.name}</h3>
                <div className={pok.typesContainer}>
                    {pokemon.types.map((type, index) => (
                        <div key={index} className={pok.pokemonType}>
                            {type}
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div>
            <div className={pok.navContainer}>
                <Navigation />
            </div>
            <div className={pok.searchContainer}>
                <form className={pok.searchForm} onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search Pokémon by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={pok.searchInput}
                    />
                    <button type="submit" className={pok.searchBtn}>
                        Search
                    </button>
                </form>
            </div>
            <div className={pok.resultsContainer}>
                {searchQuery.length > 0 ? (
                    searchResults.length > 0 ? (
                        renderPokemonCards(searchResults)
                    ) : (
                        <p>No Pokémon found.</p>
                    )
                ) : (
                    pokemons.length > 0 ? (
                        renderPokemonCards(pokemons)
                    ) : (
                        <p>No Pokémon to display.</p>
                    )
                )}
            </div>
        </div>
    );
}

export default PokedexPage;

