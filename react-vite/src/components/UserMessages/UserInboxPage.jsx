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

    if (errors && errors.general) {
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
                <div className={box.flexContainer}>
                    <div className={box.buttonsContainer}>
                            <button onClick={handleSendMessage}>
                                Compose
                            </button>
                            <button onClick={() => setView("inbox")}>
                                Inbox
                            </button>
                            <button onClick={() => setView("sent")}>
                                Sent
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

                                    <div className={box.messageBodyBox}>
                                        <div className={box.toFromDiv}>
                                            <p><strong>To:</strong> {message.receiver}</p>
                                            <p><strong>From:</strong> {message.sender}</p>
                                        </div>
                                        <div>
                                            <p><strong>Date:</strong> {message.timestamp}</p>
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
