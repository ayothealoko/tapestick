import Image from "next/image";
import logo from "@app/_assets/logo.svg";
import styles from "./index.module.css";
import clsx from "clsx";

export default function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="logo" />
        <ProfileHead firstName="Ayokanmi" lastName="Aloko" />
      </div>
    </header>
  );
}

interface ProfileHeadProps {
  firstName: string;
  lastName: string;
}
function ProfileHead({ firstName, lastName }: ProfileHeadProps) {
  const initials = firstName[0] + lastName[0];
  return <span className={clsx("p", styles.profileContainer)}>{initials}</span>;
}
