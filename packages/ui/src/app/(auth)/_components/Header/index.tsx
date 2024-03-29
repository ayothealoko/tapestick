import Image from "next/image";
import logo from "@/_assets/logo.svg";
import styles from "./index.module.css";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="logo" />
      </div>
    </header>
  );
}
