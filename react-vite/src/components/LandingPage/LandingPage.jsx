import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../redux/session";
// import ProfileButton from "../Navigation/ProfileButton";
import Navigation from "../Navigation";
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
    <div className={lan.landingPageMain}>
        <div className={lan.navContainer}>
          <Navigation />
        </div>
        <div className={lan.landingPageContainer}>
          <div className={lan.welcomeImageBox}>
            <div className={lan.infoBox}>
              <h2>Journal your Training Journey!</h2>
              <p>Connect with other Trainers and share your achievements</p>
            </div>
            <img src="/images/logo-main-cropped.png" alt="" />
          </div>
          <div className={lan.bodyContainer}>
            <div className={lan.featuresContainer}>
              <div className={lan.journalIcon}>
                <img src="/images/journal.png" alt="" />
              </div>
              <h3>Journal</h3>
            </div>
            <div className={lan.featuresContainer}>
              <div className={lan.searchIcon}>
                <img src="/images/search-icon.png" alt="" />
              </div>
              <h3>Pokedex</h3>
            </div>
            <div className={lan.featuresContainer}>
              <div className={lan.globeIcon}>
                <img src="/images/globe.png" alt="" />
              </div>
              <h3>Discover</h3>
            </div>
          </div>
        </div>
    </div>
  )
}

export default LandingPage;