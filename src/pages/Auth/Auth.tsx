import { useState } from "react";
import CustomInput from "../../components/shared/CustomInput/CustomInput";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../../store/api/authApi";
import { useAppDispatch } from "../../hooks/storeHooks";
import { setCredentials } from "../../store/AuthSlice";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  return (
    <div className={styles.auth}>
      <form
        className={styles.container}
        onSubmit={async (event) => {
          event.preventDefault();
          const result = await login({ username, password }).unwrap();

          if (result.success && result.accessToken && result.user) {
            dispatch(
              setCredentials({ user: result.user}),
            );
            localStorage.setItem('accessToken', result.accessToken)
            navigate("/", {replace: true});
          }
        }}
      >
        <CustomInput
          title="Логин"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          style={{ width: "270px" }}
        />
        <CustomInput
          title="Пароль"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          style={{ width: "270px" }}
        />
        <button className={styles.button} type="submit" disabled={isLoading}>
          Войти
        </button>
        <div className={styles.registration}>
          <Link to="/register" style={{ color: "#1E1E1E" }}>
            Регистрация
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Auth;
