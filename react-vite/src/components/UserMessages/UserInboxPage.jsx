import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInbox } from "../../redux/message";
import Navigation from "../Navigation";
// import in from './UserInboxPage.module.css'

const UserInboxPage = () => {
    const dispatch = useDispatch();
    // const currentUser = useSelector((state) => state.session.user)    

    const { inbox, loading, errors } = useSelector((state) => state.message);

    useEffect(() => {
        dispatch(getUserInbox());
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors.general || "Something went wrong"}</div>;
    }

    // console.log('CURRENT USER:', currentUser)

    return (
        <div>
            <div>
                <Navigation />
            </div>
            <div>
                {inbox.length > 0 ? (
                    <div>
                        {inbox.map((message) => (
                            <div key={message.id}>
                                <p>date: {message.timestamp}</p>
                                <p>to: {message.receiver}</p>
                                <p>from: {message.sender}</p>
                                <p>message: {message.content}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No messages.</p>
                )}
            </div>
        </div>
    )
}

export default UserInboxPage;