import styles from "./Header.module.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import StatisticSection from "./StatisticSection/StatisticSection";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <StatisticSection />
    </header>
  );
};

export default Header;
