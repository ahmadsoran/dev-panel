import Avatar from "@/components/Avatar";
import ActiveLink from "@/components/Link";
import { SidebarRoutes } from "@/util/@dashboard/Sidebar";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="saturate-150 backdrop-blur-xl w-full h-full bg-neutral-900 bg-opacity-50 p-5 rounded-xl flex flex-col justify-between items-center">
      <Avatar href="profile" />
      <div className="w-full">
        {SidebarRoutes.map((route, i) => (
          <ActiveLink
            key={i}
            href={route.path}
            className="bg-neutral-800  grid place-items-center rounded-xl my-2 w-full font-medium hover:opacity-60"
            activestyle="text-blue-500"
            deafultcolor="text-neutral-100">
            {route.name}
          </ActiveLink>
        ))}
      </div>
      <Link href="/signout">
        <div className="bg-red-900 p-2 grid place-items-center font-medium rounded-xl my-2 w-full hover:opacity-60  text-white ">
          Sign out
        </div>
      </Link>
    </aside>
  );
}
