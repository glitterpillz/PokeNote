import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as adminActions from '../../redux/user'
import { restoreUser } from "../../redux/session";
import Navigation from "../Navigation";
import all from './AdminAllUsersPage.module.css'


function AdminAllUsersPage() {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    const { users, loading, errors } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    useEffect(() => {
        dispatch(adminActions.getAllUsers());
    }, [dispatch]);


    if (loading || !isLoaded) {
        return <div>Loading...</div>;
    }

    if (errors) {
        return <div>Error: {errors}</div>;
    }

    const renderUsers = (userList) => {
        console.log('User List to Render:', userList); 
    
        if (!userList || userList.length === 0) {
            return <p>No users found.</p>;
        }
    
        return userList.map((item, index) => {
            const user = item.user; 
    
            return (
                <div
                    key={user.id || `${user.username}-${index}`}
                    className={all.userCard}
                    style={{ cursor: "pointer" }}
                >
                    <img src={user.profile_picture} alt={user.username} />
                    <h4>{user.username}</h4>
                    <p>{user.fname} {user.lname}</p>
                    <p>{user.email}</p>
                    <p>{user.admin ? 'Admin' : 'User'}</p>
                </div>
            );
        });
    };
            

    return (
        <div className={all.mainContainer}>
            <div>
                <Navigation />
            </div>
            <div className={all.mainBodyContainer}>
                {renderUsers(users || [])}
            </div>
        </div>
    )
}

export default AdminAllUsersPage;