import { useState } from "react";
import { useDispatch } from "react-redux";
import ent from "./CreateJournalEntryModal.module.css";
import { getUserJournal } from "../../redux/journal";

const UpdateEntryModal = ({ entryDetails, closeModal }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: entryDetails?.title || "",
        content: entryDetails?.content || "",
        accomplishments: entryDetails?.accomplishments || "",
        weather: entryDetails?.weather || "",
        mood: entryDetails?.mood || "",
        timestamp: entryDetails?.timestamp?.split("T")[0] || "",
        photo: null,
        is_private: entryDetails?.is_private || false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevState) => ({
            ...prevState,
            photo: file,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("content", formData.content);
        formDataToSend.append("accomplishments", formData.accomplishments);
        formDataToSend.append("weather", formData.weather);
        formDataToSend.append("mood", formData.mood);
        formDataToSend.append("is_private", formData.is_private);
        formDataToSend.append("timestamp", formData.timestamp);
        if (formData.photo) {
            formDataToSend.append("photo", formData.photo);
        }

        try {
            const response = await fetch(`/api/journal/${entryDetails.id}`, {
                method: "PUT",
                body: formDataToSend,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || "Failed to update journal entry");
            }

            const updatedEntry = await response.json();
            console.log("Entry updated:", updatedEntry);

            alert("Journal entry updated successfully!");

            dispatch(getUserJournal())

            closeModal();
        } catch (error) {
            console.error("Error updating journal entry:", error);
            alert(error.message || "An error occurred.");
        }
    };

    return (
        <div className={ent.modalOverlay}>
            <div className={ent.modalContent}>
                <h2>Update Journal Entry</h2>
                <form onSubmit={handleSubmit} className={ent.form}>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <label htmlFor="accomplishments">Accomplishments:</label>
                    <textarea
                        id="accomplishments"
                        name="accomplishments"
                        value={formData.accomplishments}
                        onChange={handleChange}
                    ></textarea>

                    <label htmlFor="weather">Weather:</label>
                    <select
                        id="weather"
                        name="weather"
                        value={formData.weather}
                        onChange={handleChange}
                    >
                        <option value="">Select weather</option>
                        <option value="Sunny">Sunny</option>
                        <option value="Cloudy">Cloudy</option>
                        <option value="Rainy">Rainy</option>
                        <option value="Snowy">Snowy</option>
                    </select>

                    <label htmlFor="mood">Mood:</label>
                    <select
                        id="mood"
                        name="mood"
                        value={formData.mood}
                        onChange={handleChange}
                    >
                        <option value="">Select mood</option>
                        <option value="Happy">Happy</option>
                        <option value="Neutral">Neutral</option>
                        <option value="Sad">Sad</option>
                        <option value="Excited">Excited</option>
                    </select>

                    <label htmlFor="timestamp">Timestamp:</label>
                    <input
                        id="timestamp"
                        type="date"
                        name="timestamp"
                        value={formData.timestamp}
                        onChange={handleChange}
                    />

                    <label htmlFor="photo">Upload Photo:</label>
                    <input
                        id="photo"
                        type="file"
                        onChange={handlePhotoChange}
                        className={ent.fileInput}
                    />
                    {formData.photo && (
                        <p>Selected Photo: {formData.photo.name}</p>
                    )}

                    <label htmlFor="is_private">Private:</label>
                    <input
                        id="is_private"
                        type="checkbox"
                        name="is_private"
                        checked={formData.is_private}
                        onChange={handleChange}
                    />

                    <div className={ent.buttonsContainer}>
                        <button type="submit" className={ent.saveButton}>
                            Save
                        </button>
                        <button
                            type="button"
                            className={ent.cancelButton}
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateEntryModal;
