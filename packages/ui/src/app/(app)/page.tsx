"use client";
import { useLoggedInRedirect } from "@/_hooks/isLoggedInHook";

import styles from "./page.module.css";

export default function Home() {
  useLoggedInRedirect(false, "./");
  return <h1>Home</h1>;
}
