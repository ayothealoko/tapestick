import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";
import Link from "next/link";

interface NeutralButtonLinkProps {
  className?: string;
  text: string;
  href: string;
}

export default function NeutralButtonLink({
  className,
  text,
  href,
}: NeutralButtonLinkProps) {
  return (
    <Link className={clsx(className, styles.button, "p")} href={href}>
      {text}
    </Link>
  );
}
