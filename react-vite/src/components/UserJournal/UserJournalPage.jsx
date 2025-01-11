import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteEntry, getUserJournal } from "../../redux/journal";
import { useModal } from "../../context/Modal";
import Navigation from "../Navigation";
import CreateJournalEntryModal from "./CreateJournalEntryModal";
import ent from './UserJournalPage.module.css'
import UpdateEntryModal from "./UpdateEntryModal";
import { useNavigate } from "react-router-dom";

const UserJournalPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setModalContent } = useModal();
    const currentUser = useSelector((state) => state.session.user);
    const { journal, loading, errors } = useSelector((state) => state.journal);

    useEffect(() => {
        dispatch(getUserJournal());
    }, [dispatch]);

    const handleCreateJournal = () => {
        setModalContent(<CreateJournalEntryModal closeModal={() => setModalContent(null)} />);
    };

    const handleUpdateEntry = (entryDetails) => {
        setModalContent(
            <UpdateEntryModal
                entryDetails={entryDetails}
                closeModal={() => setModalContent(null)} 
            />
        )
    }

    const handleDeleteEntry = async (entryId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this entry?");
            
        if (isConfirmed) {
            try {
                dispatch(deleteEntry(entryId)).unwrap();
                
                const updatedJournal = journal?.Journal.filter(entry => entry.id !== entryId);
                dispatch({ type: 'SET_JOURNAL', payload: { Journal: updatedJournal } }); // Update the state optimistically
    
                alert("Entry deleted successfully");

                dispatch(getUserJournal());
                navigate('/journal/user');  
            } catch (error) {
                console.error("Error deleting entry:", error);
                alert("Error deleting entry");
            }
        } else {
            console.log("Deletion canceled");
        }
    };
        

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors.general || "Something went wrong"}</div>;
    }

    const journalEntries = journal?.Journal || [];

    return (
        <div>
            <div className={ent.navbar}>
                <Navigation />
            </div>
            <div className={ent.mainBodyContainer}>
                <div className={ent.headerBox}>
                    <h1 className={ent.h1}>{currentUser?.fname}&apos;s Journal</h1>
                    <button 
                        className={ent.headerButton} 
                        onClick={handleCreateJournal}
                    >
                        Create Entry
                    </button>
                </div>
                <div className={ent.entriesContainer}>
                    {journalEntries.length > 0 ? (
                        <div className={ent.entryCardBox}>
                            {journalEntries.map((entry) => (
                                <div key={entry.id} style={{ marginBottom: "20px" }}>
                                    <div className={ent.entryCard}>
                                        <h2>{entry.title}</h2>
                                        <p><strong>Accomplishments:</strong> {entry.accomplishments}</p>
                                        <p><strong>Content:</strong> {entry.content}</p>
                                        <p><strong>Mood:</strong> {entry.mood}</p>
                                        <p><strong>Weather:</strong> {entry.weather}</p>
                                        <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleDateString()}</p>
                                        {entry.photo && (
                                            <div>
                                                <img src={entry.photo}
                                                alt="Journal Entry"
                                                style={{ maxWidth: '100%', height: 'auto', marginTop: '10px' }} 
                                            />
                                            </div>
                                        )}
                                        <button
                                            className={ent.editButton}
                                            onClick={() => handleUpdateEntry(entry)} // Pass the entry details here
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={ent.deleteButton}
                                            onClick={() => handleDeleteEntry(entry.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No journal entries found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserJournalPage;
