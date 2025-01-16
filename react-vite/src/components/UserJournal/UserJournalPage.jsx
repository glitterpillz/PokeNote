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
                dispatch({ type: 'SET_JOURNAL', payload: { Journal: updatedJournal } });
    
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
                                <div key={entry.id} className={ent.entryCard}>
                                    
                                    <div className={ent.entryHeader}>
                                        <h2 className={ent.h2}>{entry.title}</h2>
                                        <p className={ent.entryDate}>{new Date(entry.timestamp).toLocaleDateString()}</p>
                                    </div>

                                    <div className={ent.buttonsContainer}>
                                        <button
                                            className={ent.button}
                                            onClick={() => handleUpdateEntry(entry)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className={ent.button}
                                            onClick={() => handleDeleteEntry(entry.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                    <div className={ent.entryBody}>
                                        <div className={ent.contentBox}>
                                            <h5 className={ent.h5}>Entry:</h5>
                                            <p>{entry.content}</p>
                                        </div>
                                        <div className={ent.contentBox}>
                                            <h5 className={ent.h5}>Accomplishments:</h5>
                                            <p>{entry.accomplishments}</p>
                                        </div>
                                    </div>
                                    
                                    {entry.photo && (
                                        <div className={ent.photoBox}>
                                            <img className={ent.entryPhoto} src={entry.photo}
                                            alt="Journal Entry"
                                        />
                                        </div>
                                    )}
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
