"use client";

import Link from "next/link";
import { TextInput, TextInputProps } from "@app/(auth)/_components/TextInput";
import styles from "./page.module.css";
import clsx from "clsx";
import BigButton from "@app/(auth)/_components/BigButton";
import GoogleButton from "@app/(auth)/_components/GoogleButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "shared-code";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoggedInRedirect } from "@app/_hooks/isLoggedInHook";
import { useAuthControllerLoginMutation } from "@lib/features/api/api.service";
import { useAppDispatch } from "@lib/hooks";
import { tokenReceived } from "@lib/features/auth/auth.slice";

const inputData: Record<
  string,
  Omit<TextInputProps, "onChange" | "onBlur"> & { name: keyof LoginFormSchema }
> = {
  email: {
    id: "email",
    name: "email",
    label: "Email",
    isRequired: true,
    variant: "text",
  },

  password: {
    id: "password",
    name: "password",
    label: "Password",
    isRequired: true,
    variant: "password",
  },
};

export default function Page() {
  useLoggedInRedirect(true, "/");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const [
    login,
    {
      isLoading: isFormLoading,
      isSuccess: isFormSuccess,
      error: submitFormErr,
      data: formData,
    },
  ] = useAuthControllerLoginMutation();

  const [formErr, setFormErr] = useState<string>("");
  const { email: emailData, password: passwordData } = inputData;

  if (submitFormErr) {
    // TODO
    reset();
    setFormErr("fix err message");
  }

  if (isFormSuccess) {
    dispatch(tokenReceived(formData.accessToken));
    router.push("./");
  }

  const onSubmit: SubmitHandler<LoginFormSchema> = ({ email, password }) => {
    if (!isFormLoading) {
      login({ loginDto: { email, password } });
    }
  };

  const formErrEl = formErr ? (
    <span className={styles.formErr}>{formErr}</span>
  ) : null;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={clsx("text-style-h3", styles.h1)}>Login</h1>
        {formErrEl}
        <div className={styles.body}>
          <TextInput
            {...emailData}
            {...register(emailData.name)}
            error={errors[emailData.name]?.message}
          />
          <TextInput
            {...passwordData}
            {...register(passwordData.name)}
            error={errors[passwordData.name]?.message}
          />
          <Link className={styles.forgot} href="#">
            Forgot you password?
          </Link>
          <BigButton text="Login" isLoading={isFormLoading} />
          <GoogleButton text="Login with Google" />
          <Link className={styles.member} href="/signup">
            Not registered? <span className={styles.highlight}>Sign up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
