import clsx from "clsx";
import styles from "./TabLink.module.css";

export interface TabLinkProps {
  text: string;
  active?: boolean;
}

export default function TabLink({ text, active }: TabLinkProps) {
  return (
    <button
      className={clsx("p", styles.tabLink, { [styles.tabLink_active]: active })}
    >
      {text}
    </button>
  );
}
