import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntryById } from "../../redux/journal";
import { useParams } from "react-router-dom";
import Navigation from "../Navigation";
import { restoreUser } from "../../redux/session";
import journ from './EntryDetailsPage.module.css';

function EntryDetailsPage() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const entryDetails = useSelector((state) => state.journal.entryDetails);
    const isLoading = useSelector((state) => state.journal.loading);
    const errors = useSelector((state) => state.journal.errors);
    const currentUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (!currentUser) {
            dispatch(restoreUser());
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchEntryById(id));
        }
    }, [dispatch, currentUser, id]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }

    if (!entryDetails || !entryDetails.title) {
        return <div>Journal entry not found.</div>;
    }

    if (entryDetails.user_id !== currentUser.id && entryDetails.is_private) {
        return <div>You do not have permission to view this page.</div>;
    }

    return (
        <div>
            <div className={journ.navbar}>
                <Navigation />
            </div>
            <div className={journ.mainDetailsContainer}>
                <div className={journ.headerBox}>
                    <h1>{entryDetails.title}</h1>
                    <p>{entryDetails.timestamp}</p>
                    <p>{entryDetails.weather}</p>
                    <p>{entryDetails.mood}</p>
                </div>
                <div className={journ.detailsContainer}>
                    <p>{entryDetails.content}</p>
                    <p>{entryDetails.accomplishments}</p>
                </div>
            </div>
        </div>
    );
}

export default EntryDetailsPage;
