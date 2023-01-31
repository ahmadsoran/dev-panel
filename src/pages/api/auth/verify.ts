// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ConnectDB from "@/backend/db/connection/connection";
import WinstonLogger from "@/backend/db/logger/WinstonLogger";
import AdminAccountSchema from "@/backend/db/model/Dev-PanelSchema/AdminAccountSchema";
import SignInDataValidation from "@/backend/Validations/SignIn";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
import { isAdmin } from "@/backend/middlewears/Auth";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    ConnectDB();
    const isAuth = await isAdmin(req);
    if (!isAuth) return res.status(401).json({ error: "unauthorized" });
    return res.status(200).json({ data: "signed in" });
  } catch (error) {
    if (error instanceof Error) {
      WinstonLogger({
        level: "error",
        msg: `error while signin msg: ${error.message}`,
      });
      return res.status(500).json({ error: "unknown error happened" });
    }
  }
}
