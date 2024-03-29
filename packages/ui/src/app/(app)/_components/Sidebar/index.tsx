import Image from "next/image";

export default function Sidebar() {
  return (
    <div>
      <Item href="#" alt="Logo inbox" src="" text="Inbox" />
      <Item href="#" alt="Logo contacts" src="" text="Contacts" />
      <Item href="#" alt="Logo deals" src="" text="Deals" />
      <Item href="#" alt="Logo inventory" src="" text="Inventory" />
      <Item href="#" alt="Logo invoices" src="" text="Invoices" />
      <Item href="#" alt="Logo support" src="" text="Support" />
    </div>
  );
}

interface ItemProps {
  alt: string;
  src: string;
  text: string;
  href: string;
}

function Item({ alt, src, text }: ItemProps) {
  return (
    <a>
      <Image src={src} alt={alt} />
      <span>{text}</span>
    </a>
  );
}
