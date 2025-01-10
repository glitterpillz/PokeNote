import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserJournal } from "../../redux/journal";
import { useModal } from "../../context/Modal";
import Navigation from "../Navigation";
import CreateJournalEntryModal from "./CreateJournalEntryModal";

const UserJournalPage = () => {
    const dispatch = useDispatch();
    const { setModalContent } = useModal();
    const currentUser = useSelector((state) => state.session.user);
    const { journal, loading, errors } = useSelector((state) => state.journal);

    useEffect(() => {
        dispatch(getUserJournal());
    }, [dispatch]);

    const handleCreateJournal = () => {
        setModalContent(<CreateJournalEntryModal closeModal={() => setModalContent(null)} />);
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
            <Navigation />
            <h1>{currentUser?.fname}&apos;s Journal</h1>
            <button onClick={handleCreateJournal}>Create Journal Entry</button>
            {journalEntries.length > 0 ? (
                <div>
                    {journalEntries.map((entry) => (
                        <div key={entry.id} style={{ marginBottom: "20px" }}>
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
                        </div>
                    ))}
                </div>
            ) : (
                <p>No journal entries found.</p>
            )}
        </div>
    );
};

export default UserJournalPage;
