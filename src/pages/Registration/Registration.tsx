import CustomInput from "../../components/shared/CustomInput/CustomInput";
import styles from "./Registration.module.css";
import { Link, useNavigate } from "react-router";
import { showErrorToast } from "../../toasts/toasts";
import type { FormEvent } from "react";
import { useRegistrationMutate } from "../../hooks/useRegistrationMutation";
import { createBodyForRegistrationRequest } from "../../utils/utils";

const Register = () => {
  const navigate = useNavigate();
  const registrationMutate = useRegistrationMutate(navigate);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    if (formData.get("password") !== formData.get("confirmPassword")) {
      showErrorToast("Пароли не совпадают");
    } else {
      registrationMutate.mutate(createBodyForRegistrationRequest(formData));
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
        <button
          className={styles.button}
          disabled={registrationMutate.isPending}
        >
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
