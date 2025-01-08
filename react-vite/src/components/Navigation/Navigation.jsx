import { useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import nav from "./Navigation.module.css";

function Navigation() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)

  const openSidePanel = () => {
    setIsSidePanelOpen(true)
  };

  const closeSidePanel = () => {
    setIsSidePanelOpen(false);
  };

  return (
    <div className={nav.mainNavContainer}>
      <div className={nav.sidePanelContainer}></div>
      <button className={nav.sidePanelOpenBtn} onClick={openSidePanel}>
        ☰
      </button>

      <div
        className={`${nav.sidePanel} ${isSidePanelOpen ? nav.open : ""}`}
      >
        <button className={nav.sidePanelCloseBtn} onClick={closeSidePanel}>
          &times;
        </button>
        <nav>
          <img src="/images/logo-main.png" alt="" />
          <ul className={nav.navList}>
            <li className={nav.navItem}>
              <NavLink
                to='/'
                className={nav.navLink}
                onClick={closeSidePanel}
              >
                Home
              </NavLink>
              <NavLink
                to="/journal/user"
                className={nav.navLink}
                onClick={closeSidePanel}
              >
                Journal
              </NavLink>
              <NavLink
                to="/pokedex"
                className={nav.navLink}
                onClick={closeSidePanel}
              >
                Pokedex
              </NavLink>
              <NavLink
                to="/discover"
                className={nav.navLink}
              >
                Discover
              </NavLink>
              <hr />
              <NavLink
                  to=""
                  className={nav.navLink}
                >
                  About
                </NavLink>
                <NavLink
                  to=""
                  className={nav.navLink}
                >
                  Contact Us
                </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={nav.profileButton}>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
