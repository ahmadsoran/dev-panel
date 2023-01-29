import API from "@/util/helper/API";
import { redirect } from "next/navigation";

export default async function Home() {
  const data = false;
  if (!data) redirect("/signin");
  else redirect("/dashboard");
}
