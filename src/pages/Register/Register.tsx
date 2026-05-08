import { useState } from "react";
import CustomInput from "../../components/shared/CustomInput/CustomInput";
import styles from "./Register.module.css";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../store/api/authApi";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();
  return (
    <div className={styles.register}>
      <form
        className={styles.container}
        onSubmit={async (event) => {
          event.preventDefault();

          if (password !== confirmPassword) {
            alert("Пароли не совпадают");
            return;
          }

          const result = await register({
            username: username,
            password: password,
            email: email,
            confirmPassword: confirmPassword,
          }).unwrap();

          if (result.success) {
            navigate("/login");
          }
        }}
      >
        <CustomInput
          title="Логин *"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          style={{ width: "270px" }}
        />
        <CustomInput
          title="Email *"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          style={{ width: "270px" }}
        />
        <CustomInput
          title="Пароль *"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          style={{ width: "270px" }}
        />
        <CustomInput
          title="Повторите пароль *"
          value={confirmPassword}
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
          style={{ width: "270px" }}
        />
        <button className={styles.button} disabled={isLoading}>Зарегистрироваться</button>
        <div className={styles.login}>
          <Link to="/login" style={{ color: "#1E1E1E" }}>
            Войти
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
