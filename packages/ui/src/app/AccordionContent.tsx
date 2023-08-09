import { forwardRef } from "react";
import Button from "./Button";
import styles from "./accordionContent.module.css";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";

export interface AccordionContentProps {
  state?: string;
  file: string;
  button1: string;
  last?: boolean;
}

const AccordionContent = forwardRef<any, AccordionContentProps>(
  function AccordionContent(
    { state, file, button1, last }: AccordionContentProps,
    fowardedRef
  ) {
    const contentClass = clsx({
      [styles.container]: true,
      [styles.last]: last,
    });

    return (
      <Accordion.Content className={contentClass} ref={fowardedRef}>
        <div className={styles.info}>
          <span>{state}</span>
          <span>{file}</span>
        </div>
        <div className={styles.buttonRow}>
          <Button text={button1} variant={3} />
          <Button text="more" variant={2} />
        </div>
      </Accordion.Content>
    );
  }
);

export default AccordionContent;
