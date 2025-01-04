import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../redux/session";
import ProfileButton from "../Navigation/ProfileButton";
import lan from "./LandingPage.module.css";

function LandingPage() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

//   const toggleDropdown = () => {
//     setIsDropdownOpen((prevState) => !prevState);
//   };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className={lan.landingPageContainer}>
        <div className={lan.navContainer}>
            <ProfileButton />
        </div>
    </div>
  )
}

export default LandingPage;