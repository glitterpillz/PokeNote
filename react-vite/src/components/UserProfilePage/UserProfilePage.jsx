import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/user"; 
import { getPokemonParty } from "../../redux/pokemon";
import Navigation from "../Navigation";
import pro from './UserProfilePage.module.css';
import { useParams } from "react-router-dom"; 

function UserProfilePage() {
    const dispatch = useDispatch();
    const { id } = useParams(); 
    console.log('ID FROM URL', id)
    const { userProfile, loading, errors } = useSelector((state) => state.user); 

    const { pokemons, loading: partyLoading } = useSelector((state) => state.pokemon)

    useEffect(() => {
        console.log('DISPATCHING PROFILE WITH ID:', id);
        if (id) {
            dispatch(getUserProfile(id)); 
        }
    }, [dispatch, id]);

    useEffect(() => {
        dispatch(getPokemonParty())
      }, [dispatch])
    
    // useEffect(() => {
    //     console.log("USER PROFILE UPDATED:", userProfile);  
    // }, [userProfile]);  
    

    if (loading || partyLoading) { 
        return <div className={pro.loading}>Loading...</div>;
    }

    if (errors) {
        return <div className={pro.errors}>Error: {errors || "Something went wrong."}</div>;
    }

    if (!userProfile || userProfile.disabled) {
        return <div className={pro.errors}>No profile found.</div>;
    }
    
    const { banner_url, journal_entries, profile_picture, username } = userProfile;

    // const topPokemon = [...pokemon_collection].sort((a, b) => b.level - a.level).slice(0, 6)
    const pokemonParty = pokemons?.Pokemon || [];

    const recentJournalEntries = journal_entries.slice(0, 4)

    return (
        <div>
            <div className={pro.navbar}>
                <Navigation />
            </div>
            <div className={pro.profileContainer}>
                {banner_url ? (
                    <img
                        className={pro.bannerPic}
                        src={banner_url}
                        alt=""
                    />
                ) : (
                    <div className={pro.bannerPic}>No banner picture available</div>
                )}
                <div className={pro.profileBox}>
                    <div className={pro.profileHeader}>
                        {profile_picture ? (
                            <img
                                className={pro.profilePic}
                                src={profile_picture}
                                alt={`${username}'s profile`}
                            />
                        ) : (
                            <div className={pro.noProfilePic}>No Profile Picture</div>
                        )}
                        <h2>{username}</h2>
                    </div>
                    <div className={pro.profileDetails}>

                        <div className={pro.pokemonContainer}>
                            <h3 className={pro.h3}>Pokémon Party</h3>
                            {pokemonParty.length > 0 ? (
                            <div className={pro.pokemonBox}>
                                {pokemonParty.slice(0, 6).map((pokemon, index) => (
                                    <div 
                                    key={index} 
                                    className={pro.pokemonCard}
                                    >
                                        <div className={pro.pokemonImg}>
                                            <img 
                                                src={pokemon.pokemon.image} 
                                                alt={pokemon.pokemon.name} 
                                                className={pro.image}
                                            />
                                        </div>
                                        <div className={pro.cardBody}>
                                            <p>{pokemon.pokemon.name}</p>
                                            {pokemon?.nickname && (
                                                <p>Nickname: {pokemon.nickname}</p>
                                            )}
                                            <p>Level: {pokemon.level}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            ) : (
                            <p>No Pokémon in collection.</p>
                            )}
                        </div>        

                        <h3>Recent Journal Entries</h3>
                        {recentJournalEntries.length > 0 ? (
                            <ul>
                                {recentJournalEntries.map((entry, index) => (
                                    <li key={index}>
                                        <strong>{entry.title || "Untitled Entry"}</strong> - {entry.timestamp}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No journal entries available.</p>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
