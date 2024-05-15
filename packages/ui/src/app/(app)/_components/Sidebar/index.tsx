"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";

import contactImg from "@app/_assets/contacts.svg";
import inboxImg from "@app/_assets/inbox.svg";
import dealsImg from "@app/_assets/deals.svg";
import inventoryImg from "@app/_assets/inventory.svg";
import invoicesImg from "@app/_assets/invoices.svg";
import supportImg from "@app/_assets/support.svg";

import styles from "./index.module.css";

const routes = [
  { src: inboxImg, alt: "Logo inbox", href: "/", text: "Inbox" },
  { src: contactImg, alt: "Logo contacts", href: "#", text: "Contacts" },
  { src: dealsImg, alt: "Logo deals", href: "#", text: "Deals" },
  {
    src: inventoryImg,
    alt: "Logo inventory",
    href: "#",
    text: "Inventory",
  },
  { src: invoicesImg, alt: "Logo invoices", href: "#", text: "Invoices" },
  { src: supportImg, alt: "Logo support", href: "#", text: "Support" },
];
export default function Sidebar() {
  const path = usePathname();

  return (
    <div className={styles.container}>
      {routes.map((r) => {
        if (includesNavPath(path, r.href)) {
          return <Item {...r} active key={r.text + r.href} />;
        } else {
          return <Item {...r} key={r.text + r.href} />;
        }
      })}
    </div>
  );
}

interface ItemProps {
  alt: string;
  src: string;
  text: string;
  href: string;
  active?: boolean;
}

function Item({ href, alt, src, text, active }: ItemProps) {
  return (
    <a
      href={href}
      className={clsx(styles.link, { [styles.link_active]: active })}
    >
      <Image width="16" height="16" src={src} alt={alt} />
      <span className={clsx("p", styles.item_span)}>{text}</span>
    </a>
  );
}

// Modified to let home work
function includesNavPath(path: string, href: string): boolean {
  if (path === "/") {
    return path === href;
  }
  return href.includes(path);
}
