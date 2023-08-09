import Image from "next/image";
import styles from "./accordionHead.module.css";
import Button from "./Button";
import * as Accordion from "@radix-ui/react-accordion";
import { forwardRef } from "react";

export interface AccordionHeadProps {
  header: string;
  count?: number;
}

const AccordionHead = forwardRef<any, AccordionHeadProps>(
  function AccordionHead({ header, count }: AccordionHeadProps, forwardedRef) {
    return (
      <Accordion.Header asChild>
        <Accordion.Trigger ref={forwardedRef} asChild>
          <div className={styles.container}>
            <div className={styles.textGroup}>
              <Image
                className={styles.carret}
                src="/carret.svg"
                width="20"
                height="37"
                alt="carret icon"
              />
              <div className="text-style-h3">
                <span>{header}</span>
                <span>{count ? ` (${count})` : null}</span>
              </div>
            </div>
            <Button text="unstage" variant={1} />
          </div>
        </Accordion.Trigger>
      </Accordion.Header>
    );
  }
);

export default AccordionHead;
