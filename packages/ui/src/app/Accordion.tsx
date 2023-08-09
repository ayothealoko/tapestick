import * as Accordion from "@radix-ui/react-accordion";
import styles from "./accordionComp.module.css";
import AccordionHead from "./AccordionHead";
import AccordionContent from "./AccordionContent";

export default function AccordionComp() {
  return (
    <Accordion.Root className={styles.container} type="multiple">
      <Accordion.Item className={styles.item} value="1">
        <AccordionHead header="Unstaged changes" count={5} />
        <AccordionContent state="modified" file="mono.tsx" button1="kjksj" />
        <AccordionContent file="mono.tsx" button1="kjksj" />
        <AccordionContent file="mono.tsx" button1="kjksj" last />
      </Accordion.Item>
      <Accordion.Item className={styles.item} value="2">
        <AccordionHead header="Unstaged changes" count={5} />
        <AccordionContent state="modified" file="mono.tsx" button1="kjksj" />
        <AccordionContent file="mono.tsx" button1="kjksj" />
        <AccordionContent file="mono.tsx" button1="kjksj" last />
      </Accordion.Item>
    </Accordion.Root>
  );
}
