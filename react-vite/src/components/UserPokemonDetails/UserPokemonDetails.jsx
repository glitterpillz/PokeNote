// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";
// // import { restoreUser } from "../../redux/session";
// // import { fetchPokemonDetail } from "../../redux/pokemon";
// // // import poke from './UserPokemonDetails.module.css'

// // function UserPokemonDetails() {
// //     const { id } = useParams();
// //     // const navigate = useNavigate();
// //     const dispatch = useDispatch();
// //     const pokemons = useSelector((state) => state.pokemon);
// //     const currentUser = useSelector((state) => state.session.user);

// //     useEffect(() => {
// //         if (!currentUser) {
// //             dispatch(restoreUser())
// //         }
// //     }, [dispatch, currentUser])

// //     useEffect(() => {
// //         if (currentUser) {
// //             dispatch(fetchPokemonDetail(id));
// //         }
// //     }, [dispatch, currentUser, id])

// //     console.log('CURRENT USER', currentUser);
// //     console.log('POKEMON DETAILS', pokemons)


// //     return (
// //         <div>
// //             <h1>Hiiiiii</h1>
// //         </div>
// //     )
    
// // }

// // export default UserPokemonDetails;

// // import { useEffect } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useParams } from "react-router-dom";
// // import { restoreUser } from "../../redux/session";
// // import { fetchPokemonDetail } from "../../redux/pokemon";

// // function UserPokemonDetails() {
// //     const { id } = useParams();
// //     const dispatch = useDispatch();
// //     const pokemons = useSelector((state) => state.pokemon);
// //     const currentUser = useSelector((state) => state.session.user);

// //     useEffect(() => {
// //         if (!currentUser) {
// //             dispatch(restoreUser())
// //         }
// //     }, [dispatch, currentUser]);

// //     useEffect(() => {
// //         if (currentUser) {
// //             dispatch(fetchPokemonDetail(id));
// //         }
// //     }, [dispatch, currentUser, id]);

// //     console.log('CURRENT USER', currentUser);
// //     console.log('POKEMON DETAILS', pokemons);

// //     // Ensure that pokemons.pokemons is an array before trying to map over it
// //     const pokemonList = Array.isArray(pokemons.pokemons) ? pokemons.pokemons : [];
// //     console.log('LIST DETAILS', pokemonList)

// //     console.log("structure:", pokemons.pokemons.pokemon)

// //     return (
// //         <div>
// //             <h1>Pokemon Details</h1>
// //             {pokemonList.length === 0 ? (
// //                 <p>Loading or no Pokémon found.</p>
// //             ) : (
// //                 pokemonList.map((pokemonDetail) => (
// //                     <div key={pokemonDetail.id}>
// //                         <h2>{pokemonDetail.nickname}</h2>
// //                         <img src={pokemonDetail.pokemon.image} alt={pokemonDetail.pokemon.name} />
// //                         <p><strong>Level:</strong> {pokemonDetail.level}</p>
// //                         <p><strong>Pokemon Name:</strong> {pokemonDetail.pokemon.name}</p>
// //                         <p><strong>Custom Moves:</strong> {pokemonDetail.custom_moves.move1} / {pokemonDetail.custom_moves.move2}</p>
// //                         <p><strong>Types:</strong> {pokemonDetail.pokemon.types.join(', ')}</p>
// //                     </div>
// //                 ))
// //             )}
// //         </div>
// //     );
// // }

// // export default UserPokemonDetails;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { restoreUser } from "../../redux/session";
// import { fetchPokemonDetail } from "../../redux/pokemon";

// function UserPokemonDetails() {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const pokemons = useSelector((state) => state.pokemon);
//     const currentUser = useSelector((state) => state.session.user);

//     useEffect(() => {
//         if (!currentUser) {
//             dispatch(restoreUser());
//         }
//     }, [dispatch, currentUser]);

//     useEffect(() => {
//         if (currentUser) {
//             dispatch(fetchPokemonDetail(id));
//         }
//     }, [dispatch, currentUser, id]);

//     // Check if pokemons.pokemons is an object and get its values
//     const pokemonList = pokemons.pokemons ? Object.values(pokemons.pokemons) : [];

//     console.log('LIST DETAILS', pokemonList);

//     return (
//         <div>
//             <h1>Pokemon Details</h1>
//             {pokemonList.length === 0 ? (
//                 <p>Loading or no Pokémon found.</p>
//             ) : (
//                 pokemonList.map((pokemonDetail) => (
//                     <div key={pokemonDetail.id}>
//                         <h2>{pokemonDetail.nickname}</h2>
//                         <img src={pokemonDetail.pokemon.image} alt={pokemonDetail.pokemon.name} />
//                         <p><strong>Level:</strong> {pokemonDetail.level}</p>
//                         <p><strong>Pokemon Name:</strong> {pokemonDetail.pokemon.name}</p>
//                         <p><strong>Custom Moves:</strong> {pokemonDetail.custom_moves.move1} / {pokemonDetail.custom_moves.move2}</p>
//                         <p><strong>Types:</strong> {pokemonDetail.pokemon.types.join(', ')}</p>
//                     </div>
//                 ))
//             )}
//         </div>
//     );
// }

// export default UserPokemonDetails;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { restoreUser } from "../../redux/session";
import { fetchPokemonDetail } from "../../redux/pokemon";

function UserPokemonDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const pokemons = useSelector((state) => state.pokemon);
    const currentUser = useSelector((state) => state.session.user);

    const [isLoading, setIsLoading] = useState(true); // Local loading state

    useEffect(() => {
        if (!currentUser) {
            dispatch(restoreUser());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (currentUser) {
            setIsLoading(true); // Set loading state when fetching data
            dispatch(fetchPokemonDetail(id)).finally(() => {
                setIsLoading(false); // Stop loading when the fetch is done
            });
        }
    }, [dispatch, currentUser, id]);

    // Ensure pokemons.pokemons is an object and get its values
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
                        <h2>{pokemonDetail.nickname}</h2>
                        <img src={pokemonDetail.pokemon.image} alt={pokemonDetail.pokemon.name} />
                        <p><strong>Level:</strong> {pokemonDetail.level}</p>
                        <p><strong>Pokemon Name:</strong> {pokemonDetail.pokemon.name}</p>
                        <p><strong>Custom Moves:</strong> {pokemonDetail.custom_moves.move1} / {pokemonDetail.custom_moves.move2}</p>
                        <p><strong>Types:</strong> {pokemonDetail.pokemon.types.join(', ')}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default UserPokemonDetails;
