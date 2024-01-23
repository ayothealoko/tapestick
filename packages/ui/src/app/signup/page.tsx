"use client";

import Link from "next/link";
import { TextInput, TextInputProps } from "../_components/TextInput";
import styles from "./page.module.css";
import clsx from "clsx";
import BigButton from "../_components/BigButton";
import GoogleButton from "../_components/GoogleButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormSchemaRefined, signupFormSchemaRefined } from "shared-code";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const inputData: Record<
  string,
  Omit<TextInputProps, "onChange" | "onBlur"> & {
    name: keyof SignupFormSchemaRefined;
  }
> = {
  firstName: {
    id: "firstName",
    name: "firstName",
    label: "First name",
    isRequired: true,
    variant: "text",
  },
  lastName: {
    id: "lastName",
    name: "lastName",
    label: "Last name",
    isRequired: true,
    variant: "text",
  },
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
  confirmPassword: {
    id: "confirmPassword",
    name: "confirmPassword",
    label: "Confirm Password",
    isRequired: true,
    variant: "password",
  },
};

interface FormSentStatus {
  isFormSent: boolean;
  isTimerRunning: boolean;
}

export default function Page() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupFormSchemaRefined>({
    resolver: zodResolver(signupFormSchemaRefined),
  });

  const [formSentStatus, setFormSentStatus] = useState<FormSentStatus>({
    isFormSent: false,
    isTimerRunning: false,
  });
  const [formErr, setFormErr] = useState<string>("");
  const { firstName, lastName, email, password, confirmPassword } = inputData;

  const onSubmit: SubmitHandler<SignupFormSchemaRefined> = (data) => {
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

      sendSignup(data)
        .then(() => {
          router.push("./confirmation-sent");
        })
        .catch((e) => {
          setFormSentStatus((status) => {
            status.isFormSent = false;
            return status;
          });

          if (e.response.data) {
            let d = e.response.data;
            if (d.type && d.message) {
              setFormErr(d.message);
            }
          }
        });
    }
  };

  const formErrEl = formErr ? (
    <span className={styles.formErr}>{formErr}</span>
  ) : null;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={clsx("text-style-h3", styles.h1)}>Sign up</h1>
        {formErrEl}
        <div className={styles.body}>
          <TextInput
            {...firstName}
            {...register(firstName.name)}
            error={errors[firstName.name]?.message}
          />
          <TextInput
            {...lastName}
            {...register(lastName.name)}
            error={errors[lastName.name]?.message}
          />
          <TextInput
            {...email}
            {...register(email.name)}
            error={errors[email.name]?.message}
          />
          <TextInput
            {...password}
            {...register(password.name)}
            error={errors[password.name]?.message}
          />

          <TextInput
            {...confirmPassword}
            {...register(confirmPassword.name)}
            error={errors[confirmPassword.name]?.message}
          />
          <BigButton
            text="Sign up"
            isLoading={
              formSentStatus.isFormSent && formSentStatus.isTimerRunning
            }
          />
          <GoogleButton text="Sign up with Google" />
          <Link className={styles.member} href="/login">
            Already a member? <span className={styles.highlight}>Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
}

interface FormResponse {
  hashLink: string;
}

async function sendSignup<T = FormResponse>(
  data: SignupFormSchemaRefined
): Promise<AxiosResponse<T, any>> {
  return axios.post<T>("http://localhost:8000/api/v1/signup", data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}
