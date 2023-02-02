"use client";
import { getCookie } from "cookies-next";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = LinkProps;
type UserData = {
  name: string;
  username: string;
  role: string;
};
export default function Avatar(props: Props) {
  const Userinfo = getCookie("user");
  const [UserData, setUserData] = useState<UserData>();
  const path = usePathname();
  useEffect(() => {
    if (Userinfo && typeof Userinfo === "string") {
      setUserData(JSON.parse(Userinfo));
    }
  }, [Userinfo]);

  return (
    <Link
      {...props}
      href={
        props.href === "profile"
          ? `/dashboard/profile/${UserData?.username}`
          : props.href
      }>
      <div
        className={`bg-neutral-800  p-2 grid place-items-center rounded-full my-2 w-24 h-24 hover:opacity-60  text-white 
          ${
            path?.includes(UserData?.username || "")
              ? "border-2 border-green-900 border-solid"
              : ""
          }`}>
        <p className="text-center font-semibold capitalize">{UserData?.name}</p>
      </div>
    </Link>
  );
}
