"use client";

import Link from "next/link";
import { TextInput, TextInputProps } from "../_components/TextInput";
import styles from "./page.module.css";
import clsx from "clsx";
import BigButton from "../_components/BigButton";
import GoogleButton from "../_components/GoogleButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema, LoginFormSchema } from "shared-code";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoggedInRedirect } from "@/_hooks/isLoggedInHook";

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

interface FormSentStatus {
  isFormSent: boolean;
  isTimerRunning: boolean;
}

export default function Page() {
  useLoggedInRedirect(true, "./");
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });
  const [formSentStatus, setFormSentStatus] = useState<FormSentStatus>({
    isFormSent: false,
    isTimerRunning: false,
  });
  const [formErr, setFormErr] = useState<string>("");
  const { email: emailData, password: passwordData } = inputData;

  const onSubmit: SubmitHandler<LoginFormSchema> = (data) => {
    const { isFormSent, isTimerRunning } = formSentStatus;

    if (!isFormSent && !isTimerRunning) {
      // give 8 seconds before resend
      setFormSentStatus({ isFormSent: true, isTimerRunning: true });
      setTimeout(() => {
        setFormSentStatus((status) => {
          status.isTimerRunning = false;
          return status;
        });
      }, 3000);

      sendLogin(data)
        .then(() => {
          router.push("./");
        })
        .catch((e) => {
          setFormSentStatus((status) => {
            status.isFormSent = false;
            return status;
          });

          if (e.response.data) {
            let d = e.response.data;
            if (d.message) {
              setFormErr(d.message);
            }
          }
        });
    }
    reset();
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
          <BigButton
            text="Login"
            isLoading={
              formSentStatus.isFormSent && formSentStatus.isTimerRunning
            }
          />
          <GoogleButton text="Login with Google" />
          <Link className={styles.member} href="/signup">
            Not registered? <span className={styles.highlight}>Sign up</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

interface FormResponse {
  hashLink: string;
}

async function sendLogin<T = FormResponse>(
  data: LoginFormSchema
): Promise<AxiosResponse<T, any>> {
  return axios.post<T>("/api/v1/login", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
