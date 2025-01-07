import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../redux/session'
import Navigation from "../Navigation";
import acc from './UserAccountPage.module.css'


const UserAccountPage = () => {
    const dispatch = useDispatch();
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
          <div className={acc.profilePicBox}>
            <img className={acc.backgroundImg} src="/images/acc-bg.png" alt="" />
            {user.profile_picture ? (
              <img
                  className={acc.profilePicImg}
                  src={user.profile_picture}
                  alt={`${user.username}'s profile`}
              />
              ) : (
              <p><strong>Profile Picture:</strong> None</p>
            )}
          </div>
          <div className={acc.mainInfoContainer}>
                <p>{user.username}</p>
                <p><strong>Email:</strong> {user.email || "N/A"}</p>
                <p><strong>First Name:</strong> {user.fname || "N/A"}</p>
                <p><strong>Last Name:</strong> {user.lname || "N/A"}</p>
        
                <h2>Journal Entries:</h2>
                {journalEntries.length > 0 ? (
                <ul>
                    {journalEntries.map((entry, index) => (
                    <li key={index}>{entry.title || "Untitled Entry"}</li>
                    ))}
                </ul>
                ) : (
                <p>No journal entries available.</p>
                )}
        
                <h2>Pokemon Collection:</h2>
                {pokemonCollection.length > 0 ? (
                <ul>
                    {pokemonCollection.map((pokemon, index) => (
                    <li key={index}>{pokemon.pokemon.name || "Unnamed Pokemon"}</li>
                    ))}
                </ul>
                ) : (
                <p>No Pokémon in collection.</p>
                )}
            </div>
          </div>
      </div>
    );
  };
  
  export default UserAccountPage;
  