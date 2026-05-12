import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
import { clearCredentials } from "../../../store/authSlice";
import styles from "./Profile.module.css";
import { useGetFilmsMutation } from "../../../store/api/filmsApi/filmsApi";

const Profile = () => {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [, { isError }] = useGetFilmsMutation({
    fixedCacheKey: "shared-get-films",
  });
  if (isError) return null;
  return (
    <div className={styles.container}>
      <div className={styles.elem}>
        <div className={styles.user_svg} />
        <p className={styles.username}>{user?.username}</p>
      </div>
      <button
        className={styles.button}
        onClick={() => {
          localStorage.removeItem("accessToken");
          dispatch(clearCredentials());
          navigate("/login");
        }}
      >
        <div className={styles.exit_svg} />
        <p className={styles.exit}>Выйти</p>
      </button>
    </div>
  );
};

export default Profile;
