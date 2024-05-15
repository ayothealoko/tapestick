import { useState } from "react";
import CheckBox from "../Checkbox";
import emailIcon from "@app/_assets/email.svg";
import Image from "next/image";

import styles from "./MessageLine.module.css";
import clsx from "clsx";

const ALL_VARIANTS = ["top", "middle", "bottom", "full"] as const;
type VariantTuple = typeof ALL_VARIANTS;
type Variant = VariantTuple[number];

export interface MessageLineProps {
  variant: Variant;
}

export default function MessageLine({ variant }: MessageLineProps) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckClick = () => {
    setIsChecked((bool) => !bool);
  };

  return (
    <div className={clsx(styles.container, variantClass(variant))}>
      <div className={styles.firstSection}>
        <CheckBox checked={isChecked} handleClick={handleCheckClick} />
        <span className={clsx("p-semibold", styles.time)}>00:00</span>
        <span className={clsx("p", styles.sender)}>Account</span>
      </div>
      <div className={styles.secondSection}>
        <Image src={emailIcon} alt="email icon" />
        <div className={styles.messageGroup}>
          <span className="p-semibold">Female python for breeder</span>
          <span className="p">-</span>
          <span className="p">
            hi, im a new breeder looking for advice which breeds start breeding.
          </span>
        </div>
      </div>
    </div>
  );
}

function variantClass(variant: MessageLineProps["variant"]) {
  return styles[`variant_${variant}`];
}
