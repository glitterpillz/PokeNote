import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDeletedMessages, getUserInbox, getUserSentBox, deleteMessage } from "../../redux/message";
import Navigation from "../Navigation";
import { useMessageContext } from '../../context/MessageContext';
import SendMessageModal from "./SendMessageModal";
import { useModal } from "../../context/Modal";
import box from './UserInboxPage.module.css'

const UserInboxPage = () => {
    const dispatch = useDispatch();
    const { view, setView } = useMessageContext();
    const { setModalContent } = useModal();
    

    const { inbox, sentBox, deleteBox, loading, errors } = useSelector((state) => state.message);

    useEffect(() => {
        if (view === "inbox") {
            dispatch(getUserInbox());
        } else if (view === "sent") {
            dispatch(getUserSentBox());
        } else if (view === "delete") {
            dispatch(getDeletedMessages())
        }
    }, [dispatch, view]);

    const messages = view === "inbox" 
        ? inbox 
        : view === "sent" 
        ? sentBox
        : deleteBox;

    const handleSendMessage = () => {
        setModalContent(<SendMessageModal closeModal={() => setModalContent(null)}/>);
    }

    const handleDeleteMessage = (messageId) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            dispatch(deleteMessage(messageId));
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors && errors.general) {
        return <div>Error: {errors.general || "Something went wrong"}</div>;
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-US", {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        })
    }

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div className={box.mainBoxContainer}>
                <div className={box.header}>
                    <h1>{view === "inbox" ? "Inbox" : "Sent Box"}</h1>
                </div>
                <img className={box.pikachu} src="/images/pikachu.png" alt="" />
                <div className={box.flexContainer}>
                    <div className={box.buttonsContainer}>
                            <button onClick={handleSendMessage} className={box.button}>
                                Compose
                            </button >
                            <button onClick={() => setView("inbox")} className={box.button}>
                                Inbox
                            </button>
                            <button onClick={() => setView("sent")} className={box.button}>
                                Sent
                            </button>
                            <button onClick={() => setView("delete")} className={box.button}>
                                Deleted
                            </button>
                    </div>

                    

                    <div className={box.messageContainer}>
                        {messages && messages.length > 0 ? (
                            messages.map((message) => (
                                <div 
                                    key={message.id} 
                                    className={box.messageBox}
                                >
                                    <div className={box.imageBox}>
                                        <img src={message.profile_picture} alt={message.sender} />
                                    </div>

                                    <div className={box.messageBodyContainer}>
                                        <div className={box.messageBodyBox}>
                                            <div className={box.headerDiv}>
                                                <div className={box.toFromRow}>
                                                    <p><strong>To:</strong> {message.receiver}</p>
                                                    <p><strong>From:</strong> {message.sender}</p>
                                                </div>
                                                <div className={box.dateDeleteRow}>
                                                    <p className={box.date}><strong>Date:</strong> {formatTimestamp(message.timestamp)}</p>                                            
                                                    {view === "inbox" && (
                                                        <button 
                                                            onClick={() => handleDeleteMessage(message.id)}
                                                            className={box.deleteButton}    
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={box.messageBody}>
                                            <p><strong>Message:</strong> {message.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No messages.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserInboxPage;
