import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as pokemonActions from "../../redux/pokemon"
import Navigation from "../Navigation";
import { restoreUser } from "../../redux/session"
import coll from './UserPokemonCollection.module.css'
import { useNavigate } from "react-router-dom";

function UserPokemonCollection() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
                    <div>
                        {pokemonCollection.map((pokemon) => (
                            <div key={pokemon.id} style={{ marginBottom: '20px' }}>
                                <img src={pokemon.pokemon.image} alt={pokemon.pokemon.name} />
                                <h1>{pokemon.pokemon.name}</h1>
                                <h2>{pokemon.nickname}</h2>
                                <button
                                    type="button"
                                    className={coll.viewButton}
                                    onClick={() => navigate(`/pokemon/collection/${pokemon.id}`)}
                                >
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                
                ) : (
                    <p>No pokemon collection found.</p>
                )}
            </div>
        </div>
    )
}

export default UserPokemonCollection;