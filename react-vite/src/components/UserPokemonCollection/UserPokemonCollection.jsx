import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pokemonActions from "../../redux/pokemon"
import Navigation from "../Navigation";
import { restoreUser } from "../../redux/session"


function UserPokemonCollection() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    const { pokemons, loading, errors } = useSelector((state) => state.pokemon);

    useEffect(() => {
        if (!currentUser) {
            dispatch(restoreUser());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (currentUser) {
            dispatch(pokemonActions.getUserPokemon());
        }
    }, [dispatch, currentUser]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors.general || "Something went wrong"}</div>;
    }

    const pokemonCollection = pokemons?.Pokemon || [];
    console.log('CURRENT USER:', currentUser)
    console.log('POKEMON COLLECTION:', pokemonCollection)

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div>
                {pokemonCollection.length > 0 ? (
                    <ul>
                    {pokemonCollection.map((pokemon) => (
                        <li key={pokemon.pokemon.id} style={{ marginBottom: '20px' }}>
                            <img src={pokemon.pokemon.image} alt={pokemon.pokemon.name} />
                            <h2>{pokemon.nickname}</h2>
                        </li>
                    ))}
                </ul>
                
                ) : (
                    <p>No pokemon collection found.</p>
                )}
            </div>
        </div>
    )
}

export default UserPokemonCollection;