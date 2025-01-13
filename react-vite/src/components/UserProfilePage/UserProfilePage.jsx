import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/user"; 
import Navigation from "../Navigation";
import pro from './UserProfilePage.module.css';
import { useParams } from "react-router-dom"; 

function UserProfilePage() {
    const dispatch = useDispatch();
    const { id } = useParams(); 
    console.log('ID FROM URL', id)
    const { userProfile, loading, errors } = useSelector((state) => state.user); 

    useEffect(() => {
        console.log('DISPATCHING PROFILE WITH ID:', id);
        if (id) {
            dispatch(getUserProfile(id)); 
        }
    }, [dispatch, id]);
    
    useEffect(() => {
        console.log("USER PROFILE UPDATED:", userProfile);  
    }, [userProfile]);  
    

    if (loading) { 
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors || "Something went wrong."}</div>;
    }

    if (!userProfile) {
        return <div>No profile data available.</div>;
    }
    
    const { banner_url, journal_entries, pokemon_collection, profile_picture, username } = userProfile;

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
                        <h3>Journal Entries</h3>
                        {journal_entries && journal_entries.length > 0 ? (
                            <ul>
                                {journal_entries.map((entry, index) => (
                                    <li key={index}>{entry.title || "Untitled Entry"}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No journal entries available.</p>
                        )}
        
                        <h3>Pokemon Collection</h3>
                        {pokemon_collection && pokemon_collection.length > 0 ? (
                            <ul>
                                {pokemon_collection.map((pokemon, index) => (
                                    <li key={index}>{pokemon.pokemon.name || "Unnamed Pokemon"}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No Pokémon in collection.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
