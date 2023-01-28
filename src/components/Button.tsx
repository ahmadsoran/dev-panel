"use client";

import { Button, ButtonProps } from "antd";

type Props = ButtonProps;
export default function MyButton(props: Props) {
  return (
    <Button
      {...props}
      className={
        "my-3 bg-neutral-900 text-white hover:bg-opacity-75" + props.className
      }
      type="ghost">
      {props.children}
    </Button>
  );
}
