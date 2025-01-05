import profile from "./ProfileButton.module.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import * as sessionActions from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";



function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const userIcon = <FaCircleUser />;

  return (
    <div className={profile.profileButton}>
      <button onClick={toggleMenu}>{userIcon}</button>
      {showMenu && (
        <div className={profile.profileDropdown} ref={ulRef}>
          <ul>
            {user ? (
              <>
                <li>{user.username || "No username available"}</li>
                <li>{user.email || "No email available"}</li>
                <li>
                  <button onClick={logout} className={profile.modalButton}>
                    Log Out
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <OpenModalMenuItem
                    itemText="Log In"
                    onItemClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                    className={profile.modalButton}
                  />
                </li>
                <li>
                  <OpenModalMenuItem
                    itemText="Sign Up"
                    onItemClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                    className={profile.modalButton}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
