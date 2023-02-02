import WinstonLogger from "@/backend/db/logger/WinstonLogger";
import PlatformSchema from "@/backend/db/model/PlatformSchema/Platform";
import { NextApiRequest, NextApiResponse } from "next";

export async function GetPlatformByID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { platform } = req.query;
  if (!platform || typeof platform !== "string")
    return res.status(400).json({ error: "require platform platform" });
  try {
    const platforms = await PlatformSchema.findById(platform);
    if (!platforms) return res.status(404).json({ error: "no data found!" });
    return platforms;
  } catch (error) {
    if (error instanceof Error) {
      WinstonLogger({
        level: "error",
        msg: `error while geting platforms data msg: ${error.message}`,
      });
      return res.status(500).json({ error: "unkown error happen" });
    }
  }
}
