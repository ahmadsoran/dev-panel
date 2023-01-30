// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ConnectDB from "@/backend/db/connection/connection";
import WinstonLogger from "@/backend/db/logger/WinstonLogger";
import AdminAccountSchema from "@/backend/db/model/Dev-PanelSchema/AdminAccountSchema";
import { isAdmin } from "@/backend/middlewears/Auth";
import AddAdminUserValidation from "@/backend/Validations/Add-AdminUser";
import { genSalt, hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, role, username, password } = req.body;
  const saltRound = 11;
  try {
    ConnectDB();
    const isAuth = await isAdmin(req);
    if (!isAuth) return res.status(401).json({ error: "unauthorized" });
    try {
      await AddAdminUserValidation.validateAsync({
        name,
        role,
        username,
        password,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
    const GenSalt = await genSalt(saltRound, "a");
    const isUsernameAvailable = await AdminAccountSchema.findOne({ username })
      .lean()
      .exec();
    if (isUsernameAvailable)
      return res.status(400).json({ error: "this username is taken" });
    const HashedPassword = await hash(password, GenSalt);
    const createAdminUser = new AdminAccountSchema({
      name,
      role,
      password: HashedPassword,
      username,
    });
    await createAdminUser.save();
    return res.json({
      user: `${name} created successfully`,
    });
  } catch (error) {
    if (error instanceof Error) {
      WinstonLogger({
        level: "error",
        msg: `error while adding use msg: ${error.message}`,
      });
      return res.status(500).json({ error: "unknown error happened" });
    }
  }
}
