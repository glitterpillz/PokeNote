// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../context/Modal";
// import { thunkSignup } from "../../redux/session";
// import "./SignupForm.css";

// function SignupFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       return setErrors({
//         confirmPassword:
//           "Confirm Password field must be the same as the Password field",
//       });
//     }

//     const serverResponse = await dispatch(
//       thunkSignup({
//         email,
//         username,
//         password,
//       })
//     );

//     if (serverResponse) {
//       setErrors(serverResponse);
//     } else {
//       closeModal();
//     }
//   };

//   return (
//     <>
//       <h1>Sign Up</h1>
//       {errors.server && <p>{errors.server}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>
//           Email
//           <input
//             type="text"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </label>
//         {errors.email && <p>{errors.email}</p>}
//         <label>
//           Username
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         {errors.username && <p>{errors.username}</p>}
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.password && <p>{errors.password}</p>}
//         <label>
//           Confirm Password
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </label>
//         {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
//         <button type="submit">Sign Up</button>
//       </form>
//     </>
//   );
// }

// export default SignupFormModal;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [admin, setAdmin] = useState(false);
  const [pokemon_collection] = useState([]);
  const [profile_picture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const res = await dispatch(
      sessionActions.signup({
        username,
        email,
        password,
        fname,
        lname,
        admin,
        pokemon_collection,
        profile_picture
      })
    );

    if (sessionActions.signup.rejected.match(res)) {
      setErrors(res.payload);
    }

    if (sessionActions.signup.fulfilled) {
      closeModal();
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          First Name
          <input
            type="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </label>
        {errors.fname && <p>{errors.fname}</p>}
        <label>
          Last Name
          <input
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </label>
        {errors.lname && <p>{errors.lname}</p>}
        <label>
          Admin
          <input
            type="checkbox"
            checked={admin}
            onChange={(e) => setAdmin(e.target.checked)}
          />
        </label>
        <label>
          Profile Picture URL
          <input
            type="text"
            value={profile_picture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </label>
        {errors.profile_picture && <p>{errors.profile_picture}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;


