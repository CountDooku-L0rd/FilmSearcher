import { EGenre } from "@yp-mentor/films-server-types";
import { genreOptions } from "../../../constants/constants";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import styles from "./CheckboxList.module.css";
import { useAppSelector } from "../../../hooks/storeHooks";

const CheckboxList = ({
  onChange,
  title,
  error,
}: {
  onChange: (value: EGenre, checked: boolean) => void;
  title: string;
  error?: string | null;
}) => {
  const { data } = useAppSelector((store) => store.modal);
  return (
    <div className={styles.label}>
      <p>{title}</p>
      <ul className={styles.list}>
        {genreOptions.map((item) =>
          item.value !== EGenre.all ? (
            <CustomCheckbox
              isChecked={data.genres.includes(item.value)}
              onChange={onChange}
              value={item}
            />
          ) : null,
        )}
      </ul>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default CheckboxList;
