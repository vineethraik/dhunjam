import "./LoginPage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logInWithEmailPassword } from "src/services/auth";
import { useNavigate } from "react-router-dom";
import { setAuthError } from "src/redux/slices/auth";

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  });

  return (
    <div className=" flex flex-column justify-center align-items-center w-100 h-100 gap-20 login">
      <span className="padding_10 header">Venue Admin Login</span>
      <input
        required
        value={email}
        placeholder="Username"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        required
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      {error && <p className="error__message">{error}</p>}
      <button
        onClick={() => {
          if (email !== "" && password !== "") {
            dispatch(logInWithEmailPassword({ email, password }));
          } else {
            dispatch(setAuthError("Email and Password cant be empty"));
          }
        }}
        className={`${loading ? "background-gray" : ""}`}
        disabled={loading}
      >
        Sign in
      </button>
      <span>New Registration?</span>
    </div>
  );
}

export default LoginPage;
