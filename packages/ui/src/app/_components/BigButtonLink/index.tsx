import Link from "next/link";
import styles from "./index.module.css";

export interface BigButtonLinkProps {
  text: string;
  href: string;
}

export function BigButtonLink({ text, href }: BigButtonLinkProps) {
  return (
    <Link className={styles.button} href={href}>
      {text}
    </Link>
  );
}
