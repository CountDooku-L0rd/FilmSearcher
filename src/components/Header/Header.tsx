import styles from "./Header.module.css";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import Profile from "./Profile/Profile";
import StatisticSection from "./StatisticSection/StatisticSection";

const Header = () => {
  return (
    <header className={styles.header}>
      <HeaderLogo />
      <StatisticSection />
      <Profile/>
    </header>
  );
};

export default Header;
