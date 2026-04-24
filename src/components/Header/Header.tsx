import { useAppSelector } from "../../hooks/storeHooks";
import styles from "./Header.module.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import StatisticSection from "./StatisticSection/StatisticSection";

const Header = () => {
  const { serverError } = useAppSelector((store) => store.main);
  return (
    <header className={styles.header}>
      <HeaderLogo />
      {!serverError && <StatisticSection />}
    </header>
  );
};

export default Header;
