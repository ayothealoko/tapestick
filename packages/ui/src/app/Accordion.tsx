import * as Accordion from "@radix-ui/react-accordion";
import styles from "./accordionComp.module.css";
import AccordionHead from "./AccordionHead";
import AccordionContent from "./AccordionContent";
import { useStatus } from "./model/hooks/status";
import { StatusFile, SectionName } from "shared-code";

export default function AccordionComp() {
  const { data: status, isSuccess: isStatusSuccess } = useStatus();
  return isStatusSuccess && status ? (
    <Accordion.Root className={styles.container} type="multiple">
      <Accordion.Item className={styles.item} value="1">
        <AccordionHead header="Untracked" count={status.untracked.length} />
        {status.untracked.map((x) => {
          return (
            <ContentFile
              statusFile={x}
              sectionName="untracked"
              button1="stage"
            />
          );
        })}
      </Accordion.Item>
      <Accordion.Item className={styles.item} value="2">
        <AccordionHead
          header="Unstaged changes"
          count={status.unstaged.length}
        />
        {status.unstaged.map((x) => {
          return (
            <ContentFile
              statusFile={x}
              sectionName="unstaged"
              button1="stage"
            />
          );
        })}
      </Accordion.Item>
    </Accordion.Root>
  ) : (
    <p>Skelenton</p>
  );
}

interface ContentFileProps {
  statusFile: StatusFile;
  sectionName: SectionName;
  button1: string;
}

// TODO
//Normalize Status so code aint so bad
function ContentFile({ statusFile, sectionName, button1 }: ContentFileProps) {
  const statusField = statusFile.statusField;
  const sectionType = statusField.filter((x) => x.type === sectionName);
  const state = sectionType[0].status;
  return (
    <AccordionContent
      state={state}
      file={statusFile.fileName}
      button1={button1}
    />
  );
}
