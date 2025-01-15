import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { getPokemonDetails, addPokemonToCollection } from "../../redux/pokemon";
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import det from "./PokemonDetailsPage.module.css";

function PokemonDetailsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { pokemonDetails, loading, errors } = useSelector((state) => state.pokemon);

    useEffect(() => {
        console.log("DISPATCHING POKEMON WITH ID:", id);
        if (id) {
            dispatch(getPokemonDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log("POKEMON DETAILS UPDATED:", pokemonDetails);
    }, [pokemonDetails]);

    const handleNavigation = (direction) => {
        const currentId = parseInt(id, 10);
        const newId = direction === 'next' ? currentId + 1 : currentId - 1
        
        navigate(`/pokemon/${newId}`)
    }

    const handleAddPokemon = () => {
        dispatch(addPokemonToCollection(id))
            .unwrap()
            .then((data) => {
                console.log("Pokemon added successfully", data);
                alert("The Pokémon was added to your collection!");
            })
            .catch((error) => {
                console.error("Error adding Pokemon", error);
                alert("Failed to add Pokémon to your collection. Please try again.");
            });
    };

    const typeColors = {
        Fire: '#f89055',
        Water: '#469ae4',
        Grass: '#30d884',
        Electric: '#fdd75a',
        Psychic: '#f165ef',
        Ice: '#98D8D8',
        Dragon: '#9269f1',
        Dark: '#604667',
        Fairy: '#ee99c6',
        Normal: '#89a6a9',
        Poison: '#c677cf',
        Flying: '#a9c4ec',
        Bug: '#91e0b0',
        Ground: '#9c7979',
        Rock: '#ababaf',
    };

    
    if (loading) { 
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors || "Something went wrong."}</div>;
    }

    if (!pokemonDetails) {
        return <div>No pokemon data available.</div>;
    }

    const { name, image, stats, types, can_fly } = pokemonDetails;

    return (
        <div className={det.mainDetailsContainer}>
            <div className={det.navbar}>
                <Navigation />
            </div>
            <div className={det.detailsContainer}>
                
                <img className={det.pokedexImg} src="/images/pokedex-banner.png" alt="" />
                
                <img
                    className={`${det.pokemonImg} ${can_fly ? det.flyingTypeImg : ""}`}
                    src={image}
                    alt={name}
                />
                
                <div className={det.headerContainer}>
                    <img 
                        className={det.prevArrowImg} 
                        src="/images/arrow-prev.png" 
                        alt="Previous" 
                        onClick={() => handleNavigation('previous')}
                        hidden = {parseInt(id, 10) <= 1}
                    />
                    
                    <div className={det.midHeader}>
                        <h2 className={det.h2}>{name}</h2>
                        <div className={det.typesContainer}>
                        {types.map((type, index) => (
                            <div
                                key={index}
                                className={det.pokemonType}
                                style={{ backgroundColor: typeColors[type] || '#ccc' }}
                            >
                                {type}
                            </div>
                        ))}
                    </div>

                    </div>
                    
                    <img 
                        className={det.nextArrowImg} 
                        src="/images/arrow-next.png" 
                        alt="" 
                        onClick={() => handleNavigation('next')}
                        hidden = {parseInt(id, 10) >= 152}
                    />
                </div>


                 
                <div className={det.statsContainer}>
                    <img className={det.statsImg} src="/images/digital.png" alt="" />
                    <div className={det.statsBox}>
                        <h3 className={det.h3}>STATS</h3>
                        <div className={det.statsDiv}>
                            {stats.map((stat, index) => (
                                <div key={index} className={det.statBox}>
                                    <div className={det.statName}>
                                        {stat.stat_name}
                                    </div>
                                    <div className={det.statValue}>
                                        {stat.stat_value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className={det.addButton}
                    onClick={handleAddPokemon}
                >
                    Add to Collection
                </button>
            </div>
        </div>
    );
}

export default PokemonDetailsPage;