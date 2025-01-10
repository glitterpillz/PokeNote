import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { editUserPokemon, fetchPokemonDetail } from '../../redux/pokemon'; // Define this thunk
import { useState } from 'react';

function EditPokemonModal({ pokemon }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [nickname, setNickname] = useState(pokemon.nickname || '');
    const [level, setLevel] = useState(pokemon.level || '');
    const [stats, setStats] = useState(
        pokemon.pokemon.stats.map((stat) => ({
            ...stat,
        }))
    );
    const [customMoves, setCustomMoves] = useState(
        pokemon.custom_moves || { move1: '', move2: '', move3: '', move4: '' }
    );

    const handleStatChange = (index, value) => {
        setStats((prevStats) =>
            prevStats.map((stat, i) =>
                i === index ? { ...stat, stat_value: value } : stat
            )
        );
    };

    const handleCustomMoveChange = (moveKey, value) => {
        setCustomMoves((prevMoves) => ({
            ...prevMoves,
            [moveKey]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            nickname,
            level,
            stats: stats.map((stat) => ({
                stat_name: stat.stat_name,
                stat_value: Number(stat.stat_value),
            })),
            custom_moves: customMoves,
        };
    
        try {
            await dispatch(editUserPokemon({ id: pokemon.id, payload })).unwrap();
            alert('Pokémon updated successfully!');
    
            dispatch(fetchPokemonDetail(pokemon.id));
    
            closeModal();
        } catch (error) {
            console.error('Error updating Pokémon:', error);
            alert('Failed to update Pokémon. Please try again.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Pokémon</h2>
            <label>
                Nickname:
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
            </label>
            <label>
                Level:
                <input
                    type="number"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                />
            </label>
            <h3>Stats:</h3>
            {stats.map((stat, index) => (
                <div key={index}>
                    <label>
                        {stat.stat_name}
                        <input
                            type="number"
                            value={stat.stat_value}
                            onChange={(e) =>
                                handleStatChange(index, e.target.value)
                            }
                        />
                    </label>
                </div>
            ))}
            <h3>Custom Moves:</h3>
            <div>
                {Object.entries(customMoves).map(([moveKey, moveValue], index) => (
                    <label key={index}>
                        {`Move ${index + 1}:`}
                        <input
                            type="text"
                            value={moveValue}
                            onChange={(e) =>
                                handleCustomMoveChange(moveKey, e.target.value)
                            }
                        />
                    </label>
                ))}
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={closeModal}>
                Cancel
            </button>
        </form>
    );
}

export default EditPokemonModal;