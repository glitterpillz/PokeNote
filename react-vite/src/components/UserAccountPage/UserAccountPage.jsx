import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../redux/session'
import Navigation from "../Navigation";
import acc from './UserAccountPage.module.css'
import { useNavigate } from "react-router-dom";


const UserAccountPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userAccount, loading, errors } = useSelector((state) => state.session);

    useEffect(() => {
      dispatch(sessionActions.userAccount());
    }, [dispatch]);


    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (errors) {
      return <div>Error: {errors.general || "Something went wrong"}</div>;
    }
  
    if (!userAccount || !userAccount.user) {
      return <div>No account data available.</div>;
    }
  
    const { user } = userAccount;
    const journalEntries = user.journal_entries || [];
    const pokemonCollection = user.pokemon_collection || [];

    console.log("POKEMON COLLECTION!:", pokemonCollection);
  
    return (
      <div>
        <div className={acc.navbar}>
            <Navigation />
        </div>
        <div className={acc.accountMainContainer}>
          <img className={acc.backgroundImg} src={user.banner_url} alt="" />
          <div className={acc.header}>
            <div className={acc.profilePicBox}>
              {user.profile_picture ? (
                <img
                    className={acc.profilePicImg}
                    src={user.profile_picture}
                    alt={`${user.username}'s profile picture`}
                />
                ) : (
                <p><strong>Profile Picture:</strong> None</p>
                )}
                <div className={acc.profileInfoBox}>
                  <p>
                    <strong>{user.username}</strong> <br />
                    {user.email || "N/A"}
                  </p>
                </div>
            </div>
            <button onClick={() => navigate('/account/update')}>
              Edit
            </button>
          </div>
          <hr className={acc.hr}/>
          <div className={acc.mainInfoContainer}>
            <div className={acc.nameContainer}>
              <div className={acc.nameBox}>
                 <p>First Name</p>
                 <p className={acc.nameTitle}>{user.fname || "N/A"}</p>
              </div>
              <div className={acc.nameBox}>
                <p>Last Name</p>
                <p className={acc.nameTitle}>{user.lname || "N/A"}</p>
              </div>
            </div>
            <div className={acc.linkContainer}>
              <h2 className={acc.h2}>Pokemon Collection:</h2>
              <hr />
              {pokemonCollection.length > 0 ? (
                <div className={acc.entryList}>
                    {pokemonCollection.map((pokemon, index) => (
                    <div key={index} className={acc.listEntry}>
                      <p>{pokemon.pokemon.name || "Unnamed Pokemon"}</p>
                      <p>Level: {pokemon.level}</p>
                    </div>
                    ))}
                </div>
              ) : (
                <p>No Pokémon in collection.</p>
              )}
            </div>
            <div className={acc.linkContainer}>
              <h2 className={acc.h2}>Journal Entries</h2>
              <hr />
              {journalEntries.length > 0 ? (
                <div className={acc.entryList}>
                    {journalEntries.map((entry, index) => (
                      <div key={index} className={acc.listEntry}>
                        <p>{entry.timestamp}</p>
                        <p>{entry.title || "Untitled Entry"}</p>
                      </div>
                    ))}
                </div>
                ) : (
                <p>No journal entries available.</p>
                )}          
              </div>            
            </div>
          </div>
      </div>
    );
  };
  
  export default UserAccountPage;
  