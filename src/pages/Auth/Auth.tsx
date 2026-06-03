import CustomInput from "../../components/shared/CustomInput/CustomInput";
import styles from "./Auth.module.css";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../../hooks/storeHooks";
import type { FormEvent } from "react";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import { createBodyForLoginRequest } from "../../utils/utils";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loginMutate = useLoginMutation(dispatch, navigate);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    loginMutate.mutate(createBodyForLoginRequest(formData));
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
        <button
          className={styles.button}
          type="submit"
          disabled={loginMutate.isPending}
        >
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
