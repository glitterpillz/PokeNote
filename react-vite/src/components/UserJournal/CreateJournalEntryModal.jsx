import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { createJournalEntry, getUserJournal } from '../../redux/journal'; // Ensure getUserJournal is imported
import edit from './CreateJournalEntryModal.module.css'

function CreateJournalEntryModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [accomplishments, setAccomplishments] = useState('');
    const [weather, setWeather] = useState('');
    const [mood, setMood] = useState('');
    const [date, setDate] = useState('');
    const [isPrivate, setIsPrivate] = useState(false);
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const entryData = new FormData();
        entryData.append('title', title);
        entryData.append('content', content);
        entryData.append('accomplishments', accomplishments);
        entryData.append('weather', weather);
        entryData.append('mood', mood);
        entryData.append('date', date);
        entryData.append('is_private', isPrivate);
        if (photo) {
            entryData.append('photo', photo);
        }

        try {
            console.log('ENTRY DATA:', entryData);
            await dispatch(createJournalEntry(entryData)).unwrap();
            alert('Journal entry created successfully!');

            dispatch(getUserJournal());

            closeModal();
        } catch (error) {
            console.error('Error creating journal entry:', error);
            alert('Failed to create journal entry. Please try again.');
        }
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    }

    return (
        <div className={edit.editFormContainer}>
            <div className={edit.mewPic}>
                <img src="/images/mew.png" alt="" />
            </div>
            {/* <h2 className={edit.}>Create Journal Entry</h2> */}
            <form className={edit.form} onSubmit={handleSubmit}>
                <div className={edit.formHeading}>
                    <div className={edit.inputBox}>
                        <label>
                            Date:
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={edit.formInput}
                        />

                    </div>

                    <div className={edit.inputBox}>
                        <label>
                            Title:
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={edit.formInput}
                            required
                        />
                    </div>

                    <div className={edit.inputBox}>
                        <label>
                            Weather:
                        </label>
                        <select
                            value={weather}
                            onChange={(e) => setWeather(e.target.value)}
                            className={edit.inputSelect}
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

                    <div className={edit.inputBox}>
                        <label>
                            Mood:
                        </label>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className={edit.inputSelect}
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

                <div className={edit.contentBox}>
                    <label className={edit.formLabel}>
                        Entry:
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={edit.contentTextArea}
                        required
                    />
                </div>

                <div className={edit.accomplishBox}>
                    <label className={edit.formLabel}>
                        Accomplishments:
                    </label>
                    <textarea
                        value={accomplishments}
                        onChange={(e) => setAccomplishments(e.target.value)}
                        className={edit.accomplishTextArea}
                    />
                </div>

                {/* <div>
                    <label htmlFor="photo">Upload Photo:</label>
                    <label>(optional)</label>
                    <input
                        id="photo"
                        type="file"
                        onChange={handlePhotoChange}
                        className={edit.fileInput}
                    />
                    <div className={edit.fileButtonField}>
                        <button
                            type="button"
                            className={edit.customFileButton}
                            onClick={() => document.getElementById('photo').click()}
                        >
                            Choose File
                        </button>
                        <span className={edit.fileName}>
                            {photo ? photo.name : "No file chosen"}
                        </span>
                    </div>
                </div> */}

                <div className={edit.photoBox}>
                    <div className={edit.photoLabelBox}>
                        <label className={edit.formLabel}htmlFor="photo">Upload Photo:</label>
                        <label className={edit.optional}>(optional)</label>
                        <input
                            id="photo"
                            type="file"
                            onChange={handlePhotoChange}
                            className={`${edit.fileInput} ${edit.hiddenFileInput}`} // Add hiddenFileInput class
                        />
                    </div>
                    <div className={edit.fileButtonField}>
                        <button
                            type="button"
                            className={edit.customFileButton}
                            onClick={() => document.getElementById('photo').click()}
                        >
                            Choose File
                        </button>
                        <span className={edit.fileName}>
                            {photo ? photo.name : "No file chosen"}
                        </span>
                    </div>
                </div>

                <div className={edit.privateBox}>
                    <label className={edit.formLabel}>
                        Private Entry:
                    </label>
                    <input
                        type="checkbox"
                        checked={isPrivate}
                        onChange={() => setIsPrivate((prev) => !prev)}
                    />
                </div>

                <div className={edit.formButtons}>
                    <button className={edit.button} type="submit">Save</button>
                    <button className={edit.button} type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default CreateJournalEntryModal;

