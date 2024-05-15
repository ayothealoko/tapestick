import { MouseEvent } from "react";
import styles from "./index.module.css";

import uncheckedImg from "@app/_assets/uncheckedImage.svg";
import checkedImg from "@app/_assets/checkedImage.svg";

export type ImgImport = { src: string };

export interface CheckBoxProps {
  uncheckedImage?: ImgImport;
  checkedImage?: ImgImport;
  checked: boolean;
  handleClick(event?: MouseEvent): void;
}

export default function CheckBox({
  uncheckedImage,
  checkedImage,
  checked,
  handleClick,
}: CheckBoxProps) {
  const backgroundImage = chooseImage(checked, checkedImage, uncheckedImage);
  return (
    <div
      onClick={handleClick}
      className={styles.container}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <span className={styles.placeholder}>Icon</span>
    </div>
  );
}

function chooseImage(
  checked: boolean,
  checkedImage: ImgImport = checkedImg,
  unCheckedImage: ImgImport = uncheckedImg
) {
  return checked ? checkedImage.src : unCheckedImage.src;
}
