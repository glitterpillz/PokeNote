import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInbox, getUserSentBox } from "../../redux/message";
import Navigation from "../Navigation";
import { useMessageContext } from '../../context/MessageContext';
import SendMessageModal from "./SendMessageModal";
import { useModal } from "../../context/Modal";
import box from './UserInboxPage.module.css'

const UserInboxPage = () => {
    const dispatch = useDispatch();
    const { view, setView } = useMessageContext();
    const { setModalContent } = useModal();
    

    const { inbox, sentBox, loading, errors } = useSelector((state) => state.message);

    useEffect(() => {
        if (view === "inbox") {
            dispatch(getUserInbox());
        } else if (view === "sent") {
            dispatch(getUserSentBox());
        }
    }, [dispatch, view]);

    const messages = view === "inbox" ? inbox : sentBox;

    const handleSendMessage = () => {
        setModalContent(<SendMessageModal closeModal={() => setModalContent(null)}/>);
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors.general || "Something went wrong"}</div>;
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
                <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
                    <button onClick={() => setView("inbox")} style={{ backgroundColor: view === "inbox" ? "#ddd" : "#fff" }}>
                        Inbox
                    </button>
                    <button onClick={() => setView("sent")} style={{ backgroundColor: view === "sent" ? "#ddd" : "#fff" }}>
                        Sent
                    </button>
                    <button onClick={handleSendMessage}>
                        New Message
                    </button>
                </div>
            </div>
            <div className={box.messageContainer}>
                {messages && messages.length > 0 ? (
                    messages.map((message) => (
                        <div 
                            key={message.id} 
                            style={{ margin: "1em 0", border: "1px solid #ccc", padding: "1em" }}
                            className={box.messageBox}
                        >
                            <p><strong>Date:</strong> {message.timestamp}</p>
                            <p><strong>To:</strong> {message.receiver}</p>
                            <p><strong>From:</strong> {message.sender}</p>
                            <p><strong>Message:</strong> {message.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
        </div>
    );
};

export default UserInboxPage;
