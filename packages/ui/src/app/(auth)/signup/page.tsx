"use client";

import Link from "next/link";
import { TextInput, TextInputProps } from "@app/(auth)/_components/TextInput";
import styles from "./page.module.css";
import clsx from "clsx";
import BigButton from "@app/(auth)/_components/BigButton";
import GoogleButton from "@app/(auth)/_components/GoogleButton";
import { useLoggedInRedirect } from "@app/_hooks/isLoggedInHook";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormSchemaRefined, signupFormSchemaRefined } from "shared-code";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useAuthControllerSignupMutation } from "@lib/features/api/api.service";
import { useAppDispatch } from "@lib/hooks";
import { tokenReceived } from "@lib/features/auth/auth.slice";

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

export default function Page() {
  useLoggedInRedirect(true, "/");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<SignupFormSchemaRefined>({
    resolver: zodResolver(signupFormSchemaRefined),
  });

  const [
    signup,
    {
      isLoading: isFormLoading,
      isSuccess: isFormSuccess,
      error: submitFormErr,
      data: formData,
    },
  ] = useAuthControllerSignupMutation();

  const [formErr, setFormErr] = useState<string>("");
  const { firstName, lastName, email, password, confirmPassword } = inputData;

  if (submitFormErr) {
    // TODO
    reset();
    setFormErr("fix err message");
  }

  if (isFormSuccess) {
    dispatch(tokenReceived(formData.accessToken));
    router.push("./");
  }

  const onSubmit: SubmitHandler<SignupFormSchemaRefined> = ({
    email,
    password,
    firstName,
    lastName,
  }) => {
    console.log("WE MADWE IF");
    if (!isFormLoading) {
      signup({ createUserDto: { email, password, firstName, lastName } });
    }
  };

  const formErrEl = formErr ? (
    <span className={styles.formErr}>{formErr}</span>
  ) : null;

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
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
            onClick={() => {
              console.log("yeees");
              if (formRef.current !== null) {
                console.log("done");
                formRef.current.requestSubmit();
              }
            }}
            isLoading={isFormLoading}
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
