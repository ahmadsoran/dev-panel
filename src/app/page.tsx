"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const route = useRouter();
  useEffect(() => {
    fetch("/api/auth")
      .then((res) => {
        if (res.ok) return route.push("/dashboard");
        else route.push("/signin");
      })
      .catch((e) => console.log(e));
  }, []);

  return "";
}
