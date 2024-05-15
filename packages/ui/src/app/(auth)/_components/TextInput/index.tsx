import * as Label from "@radix-ui/react-label";
import styles from "./index.module.css";
import clsx from "clsx";
import React, { MouseEventHandler, forwardRef, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import openEye from "@app/_assets/openeye.svg";
import closedEye from "@app/_assets/closedeye.svg";
import Image from "next/image";

export interface TextInputProps {
  name: string;
  label?: string;
  id: string;
  isRequired: boolean;
  variant: "text" | "password";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  error?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    { name, label, id, isRequired, variant, error, onChange, onBlur },
    ref
  ) {
    const nodeRef = useRef(null);
    const [isEyeOpen, setIsEyeOpen] = useState<boolean>(false);
    const isError = !!error;
    const requiredSpan = isRequired ? (
      <span className={styles.requiredSpan}>*</span>
    ) : null;

    const isPassword = variant === "password";

    const handleEyeClick: MouseEventHandler<HTMLButtonElement> = (e) => {
      setIsEyeOpen((value) => !value);
    };

    return (
      <div className={styles.container}>
        <Label.Root className={clsx("text-style-p", styles.label)} htmlFor={id}>
          {label || name} {requiredSpan}
        </Label.Root>
        <div className={styles.inputWrapper}>
          <input
            className={clsx(styles.input, "text-style-p")}
            type={variantSelector(isEyeOpen, variant)}
            id={id}
            name={id}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
            aria-invalid={isError}
            required={isRequired}
          />
          {isPassword ? (
            <ToggleEye isEyeOpen={isEyeOpen} onClick={handleEyeClick} />
          ) : null}
        </div>
        <CSSTransition
          nodeRef={nodeRef}
          in={isError}
          timeout={200}
          classNames={{
            enter: styles.errorMsgEnter,
            enterActive: styles.errorMsgEnterActive,
            enterDone: styles.errorMsgEnterDone,
            exit: styles.errorMsgExit,
            exitActive: styles.errorMsgExitActive,
          }}
        >
          <ErrorMsg ref={nodeRef} msg={isError ? error : ""} />
        </CSSTransition>
      </div>
    );
  }
);

interface ErrorMsgProps {
  msg: string;
}

const ErrorMsg = React.forwardRef<HTMLParagraphElement, ErrorMsgProps>(
  function ErrorMsg({ msg }: ErrorMsgProps, ref) {
    return (
      <p ref={ref} className={styles.errorMsg}>
        {msg}
      </p>
    );
  }
);

interface ToggleEyeProps {
  isEyeOpen: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function ToggleEye({ isEyeOpen, onClick }: ToggleEyeProps) {
  return (
    <button className={styles.toggleEye} onClick={onClick}>
      <Image
        src={isEyeOpen ? openEye : closedEye}
        alt={`toggle password visibility: ${
          isEyeOpen ? "visible" : "not visible"
        }`}
      />
    </button>
  );
}

type Variant = TextInputProps["variant"];

function variantSelector(isOpen: boolean, variant: Variant): Variant {
  if (variant === "text" || isOpen) {
    return "text";
  }

  return "password";
}
