import styles from "./index.module.css";
import MessageLine from "./MessageLine";
import TabLink from "./TabLink";

export default function Inbox() {
  return (
    <div className={styles.container}>
      <div className={styles.tabLinkContainer}>
        <TabLink text="All" active />
        <TabLink text="Prospects" />
        <TabLink text="Clients" />
        <TabLink text="Support" />
        <TabLink text="Others" />
      </div>
      <div>
        <MessageLine variant="full" />
      </div>
    </div>
  );
}
