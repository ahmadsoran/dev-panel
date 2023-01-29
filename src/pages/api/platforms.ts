// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import API from "@/util/helper/API";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token } = req.cookies;
  console.log("🚀 ~ file: auth.ts:10 ~ token", token);
  if (!token) throw new Error("sign in first");
  try {
    const ress = await fetch(API.Platforms, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await ress.json();
    console.log("🚀 ~ file: signin.ts:24 ~ data", data);
    res.status(200).json({ data: data });
    res.end();
  } catch (error) {
    if (error instanceof Error)
      res.status(401).json({
        error: error.message,
      });
  }
}
