import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; 
import { getPokemonDetails } from "../../redux/pokemon";
import Navigation from "../Navigation";
import det from "./PokemonDetailsPage.module.css"

function PokemonDetailsPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { pokemonDetails, loading, errors } = useSelector((state) => state.pokemon)

    useEffect(() => {
        console.log('DISPATCHING POKEMON WITH ID:', id);
        if (id) {
            dispatch(getPokemonDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        console.log("POKEMON DETAILS UPDATED:", pokemonDetails);
    }, [pokemonDetails]);

    if (loading) { 
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors || "Something went wrong."}</div>;
    }

    if (!pokemonDetails) {
        return <div>No pokemon data available.</div>;
    }

    const { name, image, stats, types } = pokemonDetails;

    return (
        <div className={det.mainDetailsContainer}>
            <div className={det.navbar}>
                <Navigation />
            </div>
            <div className={det.detailsContainer}>
                <img src={image} alt={name} />
                <h2>{name}</h2>

                <div>
                    <h3>Types</h3>
                    <ul>
                        {types.map((type, index) => (
                            <li key={index}>{type}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3>Stats</h3>
                    <ul>
                        {stats.map((stat, index) => (
                            <li key={index}>
                                {stat.stat_name}: {stat.stat_value}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default PokemonDetailsPage;