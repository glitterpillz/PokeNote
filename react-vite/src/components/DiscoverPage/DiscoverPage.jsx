import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../redux/session";
import * as journalActions from "../../redux/journal";
import Navigation from "../Navigation";
import { Link } from "react-router-dom";
import { FaArrowCircleUp } from "react-icons/fa";
import dis from "./DiscoverPage.module.css";

function DiscoverPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const { journal, loading, errors } = useSelector((state) => state.journal);
    const [scrollTopButton, setScrollTopButton] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(journalActions.getAllEntries());
    }, [dispatch])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setScrollTopButton(true);
            } else {
                setScrollTopButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (loading || !isLoaded) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }

    const renderJournalEntries = (entryList) => {
        // const sortedEntries = [...entryList].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        return entryList.map((entry) => (
            <div key={entry.id} className={dis.entryCard}>
                <div className={dis.mainHeaderContainer}>
                    <div className={dis.profilePicBox}>
                        <img src={entry.profile_picture} alt="" />
                    </div>
                    <div className={dis.header}>
                        <Link to={`/user/${entry.user_id}/profile`} className={dis.profileLink}>
                            {entry.username}
                        </Link>
                        <p className={dis.timestamp}>{entry.timestamp}</p>
                    </div>
                </div>
                <div className={dis.entryInfo}>
                    <h1 className={dis.h1}>{entry.title}</h1>
                    <p className={dis.entryBody}>{entry.content}</p>
                    <img  className={dis.entryPic} src={entry.photo} alt="" />
                </div>
            </div>
        ));
    };

    const upArrow = <FaArrowCircleUp 
        className={dis.upArrow} 
        style={{ 
            'color': '#ffd444', 
            'backgroundColor': 'black',
            'borderRadius': '50%',
            'fontSize': '40px',
            'boxShadow': '0 4px 8px rgba(0, 0, 0, 0.2)',
            'cursor': 'pointer'
        }}
    />

    return (
        <div className={dis.mainContainer}>
            <Navigation />

            {scrollTopButton && (
                <div
                    className={`${dis.scrollTopButton} ${scrollTopButton ? dis.show : ''}`}
                    onClick={scrollToTop}
                >
                    {upArrow}
                </div>
            )}

                <div className={dis.mainHeader}>
                    <img className={dis.bannerImg} src="/images/adventure.jpg" alt="" />
                    <h4 className={dis.h4}>Explore the adventures of trainers around the world!</h4>
                    <p className={dis.headerMessage}>Discover stories, milestones, and moments shared by the community</p>
                </div>

            <div className={dis.mainBodyContainer}>
                {journal.length > 0 ? renderJournalEntries(journal) : <p>No entries found.</p>}
            </div>
        </div>
    );
}

export default DiscoverPage;
