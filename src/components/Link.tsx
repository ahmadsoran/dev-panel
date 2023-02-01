"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type Props = LinkProps & {
  activestyle?: string;
  children: ReactNode;
  className?: string;
  deafultcolor: string;
};

function ActiveLink(props: Props) {
  const path = usePathname();
  return (
    <Link {...props}>
      <div
        className={`${props?.className} ${
          props.href === path ? props.activestyle : props.deafultcolor
        }`}>
        {props.children}
      </div>
    </Link>
  );
}

export default ActiveLink;
