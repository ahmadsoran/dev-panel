import API from "@/util/helper/API";

export default async function isAuth() {
  try {
    const res = await fetch("/api/auth/verify", {
      method: "get",
      headers: API.RequestHeader,
    });
    if (!res.ok) return false;
    else return true;
  } catch (error) {
    throw error;
  }
}
