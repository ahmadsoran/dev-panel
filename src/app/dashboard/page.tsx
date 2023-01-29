import API from "@/util/helper/API";
import React from "react";

export default async function Dashboard() {
  const Platforms = await fetch(API.Platforms, {
    method: "get",
  });
  const data = await Platforms.json();
  console.log(data);
  return <div>Dashboard</div>;
}
