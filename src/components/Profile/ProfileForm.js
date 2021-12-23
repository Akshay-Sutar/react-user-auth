import { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const API_KEY = `AIzaSyDzKduEY_4HPZ6KWuIFK6mA2pduTV_sOjw `;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);

  const idToken = authCtx.token;

  const submitEventHandler = (event) => {
    event.preventDefault();
    const newPassword = newPasswordRef.current.value;

    const body = {
      idToken: idToken,
      password: newPassword,
      returnSecureToken: true,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        history.replace("/");
        console.log(data);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitEventHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="7"
          ref={newPasswordRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
