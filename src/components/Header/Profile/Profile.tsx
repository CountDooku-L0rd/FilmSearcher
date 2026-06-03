import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import styles from "./Profile.module.css";
import { useGetFilmsWithSync } from "../../../hooks/useGetFilmsWithSync";
import { useLogout } from "../../../hooks/useLogout";

const Profile = () => {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {error} = useGetFilmsWithSync();
  const logout = useLogout(dispatch, navigate);
  if (error) return null;
  return (
    <div className={styles.container}>
      <div className={styles.elem}>
        <div className={styles.user_svg} />
        <p className={styles.username}>{user?.username}</p>
      </div>
      <button
        className={styles.button}
        onClick={() => logout.mutate()}
        disabled={logout.isPending}
      >
        <div className={styles.exit_svg} />
        <p className={styles.exit}>Выйти</p>
      </button>
    </div>
  );
};

export default Profile;
