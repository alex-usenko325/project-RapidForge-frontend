import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link to="/" className={styles.title}>
      Aquatrack
    </Link>
  );
};

export default Logo;