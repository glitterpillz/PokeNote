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
                    <div className={all.statusBox}>
                        <label className={all.statusLabel}>status:</label>
                        <p className={all.adminStatus}>{user.admin ? 'Admin' : 'User'}</p>
                    </div>

                    <img 
                        src={user.profile_picture} 
                        alt={user.username} 
                        className={all.profilePic}
                    />
                    
                    <div className={all.userDataDiv}>
                        <div className={all.dataBox}>
                            <label>username:</label>
                            <p>{user.username}</p>
                        </div>
                        <div className={all.dataBox}>
                            <label>first name:</label>
                            <p>{user.fname}</p>
                        </div>                        
                    </div>

                    <div className={all.userDataDiv}>
                        <div className={all.dataBox}>
                            <label>email:</label>
                            <p>{user.email}</p>
                        </div>
                        <div className={all.dataBox}>
                            <label>last name:</label>
                            <p>{user.lname}</p>
                        </div>
                    </div>
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