import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntryDetails } from "../../redux/journal";
import { deleteEntry } from "../../redux/journal";
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
            dispatch(fetchEntryDetails(id));
        }
    }, [dispatch, currentUser, id]);

    const handleDelete = async (id) => {
        const userConfirmed = window.confirm(
            "Are you sure you want to delete this entry?"
        );

        if (!userConfirmed) return;

        try {
            await dispatch(deleteEntry(id)).unwrap();
            alert("Journal entry successfully deleted!");
            dispatch(fetchEntryDetails(id));
        } catch (error) {
            console.error("Error deleting journal entry", error);
            alert("Failed to delete entry. Please try again.")
        }
    };

    if (isLoading) {
        return <div className={journ.pageDiv}>Loading...</div>;
    }

    if (errors) {
        return <div className={journ.pageDiv}>Error: {errors}</div>;
    }

    if (!entryDetails || !entryDetails.title) {
        return <div className={journ.pageDiv}>Journal entry not found.</div>;
    }

    if (entryDetails.user_id !== currentUser.id && entryDetails.is_private) {
        return <div className={journ.pageDiv}>You do not have permission to view this page.</div>;
    }

    return (
        <div className={journ.mainContainer}>
            <div className={journ.navbar}>
                <Navigation />
            </div>
            <div className={journ.mainDetailsContainer}>
                <div className={journ.headerBox}>
                    <h1 className={journ.h1}>{entryDetails.title}</h1>
                    <p className={journ.date}>{entryDetails.timestamp}</p>
                </div>
                <div className={journ.detailsContainer}>
                    <div className={journ.usernameDiv}>
                        <label className={journ.label}>Username:</label>
                        <p>{entryDetails.username}</p>
                    </div>
                    <div className={journ.contentDiv}>
                        <label className={journ.label}>Content:</label>
                        <p>{entryDetails.content}</p>
                    </div>
                    <div className={journ.photoDiv}>
                        <label className={journ.label}>Entry Photo:</label>
                        <img className={journ.photo} src={entryDetails.photo} alt="" />
                    </div>
                    {currentUser.admin && (
                        <button
                            className={journ.deleteButton}
                            onClick={() => handleDelete(entryDetails.id)}
                        >
                            Delete Entry
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EntryDetailsPage;
