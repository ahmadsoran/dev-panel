import { redirect } from "next/navigation";

export default function getServerSideProps() {
  return redirect("/dashboard");
}
