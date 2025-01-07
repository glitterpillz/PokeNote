import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../redux/session';
import update from './UpdateAccountPage.module.css';
import { useNavigate } from "react-router-dom";
import Navigation from "../Navigation";

const UpdateAccountPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.session.userAccount?.user);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!currentUser) {
      dispatch(sessionActions.userAccount());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
      setFname(currentUser.fname || "");
      setLname(currentUser.lname || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!currentUser) {
      setErrors({ message: "User not found" });
      return;
    }
  
    const updatedData = new FormData();
    
    updatedData.append("username", username !== currentUser.username ? username : currentUser.username);
    updatedData.append("email", email !== currentUser.email ? email : currentUser.email);
    updatedData.append("fname", fname || currentUser.fname);
    updatedData.append("lname", lname || currentUser.lname);
  
    if (profilePicture instanceof File) {
      updatedData.append("profile_picture", profilePicture);
    }
    if (bannerUrl instanceof File) {
      updatedData.append("banner_url", bannerUrl);
    }
  
    try {
      await dispatch(sessionActions.updateAccount({ userId: currentUser.id, formData: updatedData })).unwrap();
      alert("Account updated successfully!");
      navigate('/account')
    } catch (backendErrors) {
      setErrors(backendErrors);
    }
  };
  
  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleBannerUrlChange = (e) => {
    setBannerUrl(e.target.files[0]);
  };

  return (
    <div className={update.updateMainContainer}>
      <div className={update.navbar}>
        <Navigation />
      </div>
      <div className={update.updateBodyContainer}>
        <h1 className={update.h1}>Edit Account</h1>
        <form onSubmit={handleSubmit} className={update.form}>
          <div className={update.formField}>
            <label>Username</label>
            <input
              className={update.input}
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />            
            {errors.username && <div className={update.error}>{errors.username}</div>}
          </div> 
          <div className={update.formField}>
            <label>Email</label>
              <input
                className={update.input}
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              {errors.email && <div className={update.error}>{errors.email}</div>} 
          </div> 
          <div className={update.formField}>
            <label>First Name</label>
            <input
              className={update.input}
              name="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="First Name"
            />
            {errors.fname && <div className={update.error}>{errors.fname}</div>}
          </div>
          <div className={update.fileFormField}>
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              id="profilePicture"
              type="file"
              onChange={handleProfilePictureChange}
              className={update.fileInput}
            />
            <div className={update.fileButtonField}>
              <button
                type="button"
                className={update.customFileButton}
                onClick={() => document.getElementById('profilePicture').click()}
              >
                Choose File
              </button>
              <span className={update.fileName}>
                {profilePicture ? profilePicture.name : "No file chosen"}
              </span>
            </div>
          </div>
          <div className={update.fileFormField}>
            <label htmlFor="bannerUrl">Banner Image</label>
            <input
                id="bannerUrl"
                type="file"
                onChange={handleBannerUrlChange}
                className={update.fileInput}
              />
            <div className={update.fileButtonField}>
              <button
                type="button"
                className={update.customFileButton}
                onClick={() => document.getElementById('bannerUrl').click()}
              >
                Choose File
              </button>
              <span className={update.fileName}>
                {bannerUrl ? bannerUrl.name : "No file chosen"}
              </span>
            </div>
          </div>
          <button type="submit" className={update.button}>
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccountPage;