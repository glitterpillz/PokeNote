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
            <div className={coll.mainBodyContainer}>
                <div className={coll.header}>
                    <h1 className={coll.h1}>{currentUser.fname}&apos;s Pokémon Collection</h1>
                </div>
                {pokemonCollection.length > 0 ? (
                    <div className={coll.cardsContainer}>
                        {pokemonCollection.map((pokemon) => (
                            <div key={pokemon.id} className={coll.pokemonCard}>
                                <div className={coll.imageBox}>
                                    <img className={coll.image} src={pokemon.pokemon.image} alt={pokemon.pokemon.name} />
                                </div>
                                <div className={coll.bodyBox}>
                                    <div className={coll.bodyHeader}>
                                        <h2 className={coll.h2}>{pokemon.pokemon.name}</h2>
                                        <button
                                            type="button"
                                            className={coll.viewButton}
                                            onClick={() => navigate(`/pokemon/collection/${pokemon.id}`)}
                                        >
                                            View
                                        </button>
                                    </div>
                                    <div className={coll.bodyInfo}>
                                        <div className={coll.bodyDiv}>
                                            <label>Nickname:</label>
                                            <p>{pokemon.nickname}</p>
                                        </div>
                                        <div className={coll.bodyDiv}>
                                            <label>Level:</label>
                                            <p>{pokemon.level}</p>
                                        </div>
                                    </div>
                                </div>
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