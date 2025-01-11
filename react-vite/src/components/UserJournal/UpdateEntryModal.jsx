import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateEntry, getUserJournal } from "../../redux/journal";
import { useState, useEffect } from "react";
import ent from './CreateJournalEntryModal.module.css';

function UpdateEntryModal({ entryDetails }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [timestamp, setTimestamp] = useState('');
    const [title, setTitle] = useState('');
    const [weather, setWeather] = useState('');
    const [mood, setMood] = useState('');
    const [content, setContent] = useState('');
    const [accomplishments, setAccomplishments] = useState('');
    const [photo, setPhoto] = useState(null);
    const [isPrivate, setIsPrivate] = useState(false);

    // Populate state with existing entry details when component mounts
    useEffect(() => {
        if (entryDetails) {
            setTimestamp(entryDetails.timestamp || '');
            setTitle(entryDetails.title || '');
            setWeather(entryDetails.weather || '');
            setMood(entryDetails.mood || '');
            setContent(entryDetails.content || '');
            setAccomplishments(entryDetails.accomplishments || '');
            setIsPrivate(entryDetails.isPrivate || false);
        }
    }, [entryDetails]);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const payload = {
            timestamp,
            title,
            weather,
            mood,
            content,
            accomplishments,
            is_private: isPrivate,
        };
        if (photo instanceof File) {
            payload.photo = photo; 
        }
    
        try {
            await dispatch(updateEntry({ id: entryDetails.id, payload })).unwrap();
            alert('Entry updated successfully!');

            dispatch(getUserJournal(entryDetails.user_id))

            closeModal();
        } catch (error) {
            console.error('Error updating entry:', error);
            alert('Failed to update entry. Please try again.');
        }

    };
    

    return (
        <div className={ent.mainFormContainer}>
            <div className={ent.butterPic}>
                <img src="/images/butterfree.png" alt="" />
            </div>            
            <form className={ent.form} onSubmit={handleSubmit}>
                <div className={ent.formHeading}>
                    <div className={ent.inputBox}>
                        <label>Date:</label>
                        <input
                            type="date"
                            value={timestamp}
                            onChange={(e) => setTimestamp(e.target.value)}
                            className={ent.formInput}
                            required
                        />
                    </div>

                    <div className={ent.inputBox}>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={ent.formInput}
                            required
                        />
                    </div>

                    <div className={ent.inputBox}>
                        <label>Weather:</label>
                        <select
                            value={weather}
                            onChange={(e) => setWeather(e.target.value)}
                            className={ent.inputSelect}
                        >
                            <option value="">Select Weather</option>
                            <option value="Sunny">Sunny</option>
                            <option value="Partly Cloudy">Partly Cloudy</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Rainy">Rainy</option>
                            <option value="Stormy">Stormy</option>
                            <option value="Snowy">Snowy</option>
                        </select>
                    </div>

                    <div className={ent.inputBox}>
                        <label>Mood:</label>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className={ent.inputSelect}
                        >
                            <option value="">Select Mood</option>
                            <option value="Happy">Happy</option>
                            <option value="Sad">Sad</option>
                            <option value="Angry">Angry</option>
                            <option value="Neutral">Neutral</option>
                            <option value="Tired">Tired</option>
                            <option value="Excited">Excited</option>
                            <option value="Loved">Loved</option>
                            <option value="Confident">Confident</option>
                            <option value="Grateful">Grateful</option>
                        </select>
                    </div>
                </div>

                <div className={ent.contentBox}>
                    <label className={ent.formLabel}>
                        Content:
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={ent.contentTextArea}
                        required
                    />
                </div>

                <div className={ent.accomplishBox}>
                    <label className={ent.formLabel}>
                        Accomplishments:
                    </label>
                    <textarea
                        value={accomplishments}
                        onChange={(e) => setAccomplishments(e.target.value)}
                        className={ent.accomplishTextArea}
                    />
                </div>

                {/* <div className={ent.photoBox}>
                    <label>Upload Photo:</label>
                    <input
                        type="file"
                        onChange={handlePhotoChange}
                        className={ent.fileInput}
                    />
                </div> */}

                <div className={ent.photoBox}>
                    <div className={ent.photoLabelBox}>
                        <label className={ent.formLabel}htmlFor="photo">Upload Photo:</label>
                        <label className={ent.optional}>(optional)</label>
                        <input
                            type="file"
                            onChange={handlePhotoChange}
                            className={`${ent.fileInput} ${ent.hiddenFileInput}`} // Add hiddenFileInput class
                        />
                    </div>
                    <div className={ent.fileButtonField}>
                        <button
                            type="button"
                            className={ent.customFileButton}
                            onClick={handlePhotoChange}
                        >
                            Choose File
                        </button>
                        <span className={ent.fileName}>
                            {photo ? photo.name : "No file chosen"}
                        </span>
                    </div>
                </div>
                

                <div className={ent.privateBox}>
                    <label className={ent.formLabel}>
                        Private Entry:
                    </label>
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={() => setIsPrivate((prev) => !prev)}
                    />
                </div>

                <div className={ent.formButtons}>
                    <button type="submit" className={ent.button}>
                        Save
                    </button>
                    <button type="button" className={ent.button} onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateEntryModal;