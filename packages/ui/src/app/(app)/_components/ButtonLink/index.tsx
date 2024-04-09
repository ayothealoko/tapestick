import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

interface ButtonLinkProps {
  className?: string;
  text: string;
  href: string;
}

export default function ButtonLink({ className, text, href }: ButtonLinkProps) {
  return (
    <Link className={clsx(className, styles.button, "p")} href={href}>
      {text}
    </Link>
  );
}
