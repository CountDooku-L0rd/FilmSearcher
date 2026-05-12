import CustomInput from "../../components/shared/CustomInput/CustomInput";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../../store/api/authApi/authApi";
import { useAppDispatch } from "../../hooks/storeHooks";
import { setCredentials } from "../../store/authSlice";
import type { FormEvent } from "react";

const Auth = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    login({
      username: formData.get("username")!.toString(),
      password: formData.get("password")!.toString(),
    })
      .unwrap()
      .then((response) => {
        console.log(response)
        dispatch(setCredentials({ user: response.user }));
        localStorage.setItem("accessToken", response.accessToken);
        navigate("/", { replace: true });
      });
  };
  return (
    <div className={styles.auth}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <CustomInput title="Логин" style={{ width: "270px" }} name="username" />
        <CustomInput
          title="Пароль"
          style={{ width: "270px" }}
          name="password"
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
