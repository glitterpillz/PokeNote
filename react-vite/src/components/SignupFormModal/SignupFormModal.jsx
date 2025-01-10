import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../redux/session";
import sign from "./SignupForm.module.css";

function SignupFormModal({ navigate }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = {};

    if (fname[0] !== fname[0].toUpperCase()) {
      validationErrors.fname = "First name must be capitalized";
    }

    if (lname[0] !== lname[0].toUpperCase()) {
      validationErrors.lname = "Last name must be capitalized";
    }

    if (password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords must match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const serverResponse = await dispatch(
      sessionActions.signup({
        username,
        email,
        password,
        fname,
        lname,
        admin,
      })
    );

    if (serverResponse.type === "session/signup/rejected") {
      setErrors(serverResponse);
    } else {
      await dispatch(sessionActions.restoreUser());
      navigate('/');
      closeModal();
    }
  };

  return (
    <div className={sign.signupModalContainer}>
      <h1 className={sign.h1}>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form className={sign.form} onSubmit={handleSubmit}>
        <div className={sign.inputBox}>
          <label>
            Email
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={sign.formInput}
            required
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className={sign.inputBox}>
          <label>
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={sign.formInput}
            required
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div className={sign.inputBox}>
          <label>
            First Name
          </label>
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            className={sign.formInput}
            required
          />
          {errors.fname && <p>{errors.fname}</p>}
        </div>

        <div className={sign.inputBox}>
          <label>
            Last Name
          </label>
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            className={sign.formInput}
            required
          />
          {errors.lname && <p>{errors.lname}</p>}
        </div>

        <div className={sign.inputBox}>
          <label>
            Admin
          </label>
          <input
            type="checkbox"
            checked={admin}
            onChange={(e) => setAdmin(e.target.checked)}
            className={sign.adminBox}
          />
        </div>

        <div className={sign.inputBox}>
          <label>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={sign.formInput}
            required
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className={sign.inputBox}>
          <label>
            Confirm
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={sign.formInput}
            required
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button 
          type="submit"
          className={sign.signupSubmit}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;


