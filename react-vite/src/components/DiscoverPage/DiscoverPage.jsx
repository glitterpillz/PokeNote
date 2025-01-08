import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import * as sessionActions from "../../redux/session";
import * as journalActions from "../../redux/journal";
import Navigation from "../Navigation";
import dis from "./DiscoverPage.module.css";

function DiscoverPage() {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const { journal, loading, errors } = useSelector((state) => state.journal)

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));

        if (journal.length === 0) {
            dispatch(journalActions.getAllEntries());
        }
    }, [dispatch, journal])

    if (loading || !isLoaded) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }


    const renderJournalEntries = (entryList) => {
        return entryList.map((entry) => (
            <div
                key={entry.id}
                className={dis.entryCard}
            >
                <h3>{entry.title}</h3>
                <p>{entry.timestamp}</p>
            </div>
        ))
    };

    return (
        <div>
            <div>
                <Navigation />
            </div>
            {journal.length > 0 ? (
                renderJournalEntries(journal)
            ) : (
                <p>No entries found.</p>
            )}
        </div>
    )
}

export default DiscoverPage;