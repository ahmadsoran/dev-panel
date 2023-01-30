// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ConnectDB from "@/backend/db/connection/connection";
import WinstonLogger from "@/backend/db/logger/WinstonLogger";
import AdminAccountSchema from "@/backend/db/model/Dev-PanelSchema/AdminAccountSchema";
import SignInDataValidation from "@/backend/Validations/SignIn";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import cookie from "cookie";
import jwt from "jsonwebtoken";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;
  const privateKey = process.env.PRV_KEY;

  try {
    ConnectDB();
    try {
      await SignInDataValidation.validateAsync({ username, password });
    } catch (error) {
      if (error instanceof Error) throw new Error(error.message);
    }
    ///
    if (!privateKey) throw new Error("unknown error");
    const AdminData = await AdminAccountSchema.findOne({
      username,
    });

    ///
    if (!AdminData) throw new Error("User not found!");
    const isPasswordVaild = await bcrypt.compare(password, AdminData?.password);
    ///
    if (!isPasswordVaild) throw new Error("password or username invaild");

    const token = jwt.sign({ id: AdminData._id }, privateKey, {
      expiresIn: "12h",
    });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 60 * 10,
        sameSite: "strict",
        path: "/",
      })
    );

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
