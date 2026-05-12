import CustomInput from "../../components/shared/CustomInput/CustomInput";
import styles from "./Registration.module.css";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../store/api/authApi/authApi";
import { showErrorToast } from "../../toasts/toasts";
import type { FormEvent } from "react";

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      showErrorToast("Пароли не совпадают");
    } else {
      register({
        username: formData.get("username")!.toString(),
        password: formData.get("password")!.toString(),
        email: formData.get("email")!.toString(),
        confirmPassword: formData.get("confirmPassword")!.toString(),
      })
        .unwrap()
        .then(() => {
          navigate("/login");
        })
    }
  };
  return (
    <div className={styles.register}>
      <form className={styles.container} onSubmit={handleSubmit}>
        <CustomInput
          title="Логин *"
          style={{ width: "270px" }}
          name="username"
        />
        <CustomInput title="Email *" style={{ width: "270px" }} name="email" />
        <CustomInput
          title="Пароль *"
          style={{ width: "270px" }}
          name="password"
        />
        <CustomInput
          title="Повторите пароль *"
          style={{ width: "270px" }}
          name="confirmPassword"
        />
        <button className={styles.button} disabled={isLoading}>
          Зарегистрироваться
        </button>
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
