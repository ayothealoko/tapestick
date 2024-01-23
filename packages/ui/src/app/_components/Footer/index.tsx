import Image from "next/image";
import logoMonochrome from "../../_assets/logo_monochrome.svg";
import { ReactElement } from "react";
import Link from "next/link";
import styles from "./index.module.css";

const footerLists = [
  {
    title: "Legal",
    list: [
      { name: "Privacy Policy", link: "#" },
      { name: "Terms of Services", link: "#" },
    ],
  },
  {
    title: "Resources",
    list: [
      { name: "Status", link: "#" },
      { name: "Roadmap", link: "#" },
      { name: "Changelog", link: "#" },
      { name: "Support", link: "#" },
    ],
  },
  {
    title: "Blog",
    list: [
      { name: "Latest Posts", link: "#" },
      { name: "How to integrate Notion with airtable", link: "#" },
      { name: "10 Notion integrations to 10x your productivity", link: "#" },
      { name: "Google calendar and Notion", link: "#" },
    ],
  },
];

export default function Footer(): ReactElement {
  return (
    <footer className={styles.container}>
      <div className={styles.logoContainer}>
        <Image src={logoMonochrome} alt="logo Monochrome" />
        <p>© 2023 Tape Stick</p>
      </div>
      <div className={styles.footerListWrapper}>
        {footerLists.map((x) => (
          <FooterList key={x.title} {...x} />
        ))}
      </div>
    </footer>
  );
}

interface LinkData {
  name: string;
  link: string;
}

interface FooterListProps {
  title: string;
  list: LinkData[];
}

function FooterList({ title, list }: FooterListProps): ReactElement {
  return (
    <div className={styles.footerListContainer}>
      <span className="text-style-p-bold">{title}</span>
      <ul className={`${styles.footerListUL} text-style-p`}>
        {list.map(({ name, link }) => (
          <li key={name}>
            <Link href={link}> {name} </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
