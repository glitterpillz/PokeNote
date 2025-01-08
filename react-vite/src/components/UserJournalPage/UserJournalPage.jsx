import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserJournal } from '../../redux/journal'
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { restoreUser } from "../../redux/session";


const UserJournalPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.session.user);
    const { journal, loading, errors } = useSelector((state) => state.journal);

    useEffect(() => {
        if (!currentUser) {
            dispatch(restoreUser());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (currentUser) {
            dispatch(getUserJournal());
        }
    }, [dispatch, currentUser]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors.general || "Something went wrong"}</div>;
    }

    // Accessing journal entries from the state
    const journalEntries = journal?.Journal || [];

    return (
        <div>
            <Navigation />
            <h1>{currentUser?.fname}'s Journal</h1>
            {/* Check if journal exists and is not empty */}
            {journalEntries.length > 0 ? (
                <ul>
                    {journalEntries.map((entry) => (
                        <li key={entry.id} style={{ marginBottom: '20px' }}>
                            <h2>{entry.title}</h2>
                            <p><strong>Accomplishments:</strong> {entry.accomplishments}</p>
                            <p><strong>Content:</strong> {entry.content}</p>
                            <p><strong>Mood:</strong> {entry.mood}</p>
                            <p><strong>Weather:</strong> {entry.weather}</p>
                            <p><strong>Timestamp:</strong> {new Date(entry.timestamp).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No journal entries found.</p>
            )}
        </div>
    );
};

export default UserJournalPage;
