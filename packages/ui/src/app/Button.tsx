import clsx from "clsx";
import styles from "./button.module.css";
import Image from "next/image";

export interface ButtonProps {
  text: string;
  variant: 1 | 2 | 3 | 4;
}

export default function Button({ text, variant }: ButtonProps) {
  const buttonClass = clsx({
    [styles.button]: true,
    "text-style-regular": true,
    [styles.variant1]: variant === 1,
    [styles.variant2]: variant === 2,
    [styles.variant3]: variant === 3,
    [styles.variant4]: variant === 4,
  });

  const content =
    variant === 2 ? (
      <Image src="/more.svg" alt="more icon" height={21} width={13} />
    ) : (
      text
    );
  return <button className={buttonClass}>{content}</button>;
}
