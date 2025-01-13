import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { sendMessage } from '../../redux/message';
import { getUserSentBox } from '../../redux/message';
import mod from './SendMessageModal.module.css'

function SendMessageModal() {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [receiver, setReceiver] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const messageData = {
            receiver,
            content
        };
    
        try {
            await dispatch(sendMessage(messageData)).unwrap();
            alert('Direct message sent!');
            dispatch(getUserSentBox());
            closeModal();
        } catch (error) {
            console.error("Error sending direct message", error);
            alert("Failed to send DM. Please try again.");
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit} className={mod.form}>
                <div className={mod.receiverBox}>
                    <label>To:</label>
                    <input 
                        type="text" 
                        value={receiver}
                        onChange={(e) => setReceiver(e.target.value)}
                        className={mod.input}
                        required
                    />
                </div>

                <div className={mod.messageBox}>
                    <label>Message:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className={mod.textArea}
                        required
                    />
                </div>

                <div className={mod.buttonsBox}>
                    <button 
                        type="submit" 
                        onSubmit={handleSubmit}
                        className={mod.button}
                    >
                        Send
                    </button>
                    <button 
                        type="button" 
                        onClick={closeModal}
                        className={mod.button}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SendMessageModal;