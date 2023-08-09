import styles from "./repoField.module.css";

export interface RepoFieldProps {
  field: string;
  entry: string;
  branch?: string;
}

export default function RepoField({ field, entry, branch }: RepoFieldProps) {
  return (
    <div className={styles.container}>
      <span className={styles.field}>{field}</span>
      <div className={styles.entry}>
        <span className={styles.branch}>{branch}</span> <span>{entry}</span>
      </div>
    </div>
  );
}
