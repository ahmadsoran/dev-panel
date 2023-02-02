import ConnectDB from "@/backend/db/connection/connection";
import WinstonLogger from "@/backend/db/logger/WinstonLogger";
import PlatformSchema from "@/backend/db/model/PlatformSchema/Platform";
import { NextApiRequest, NextApiResponse } from "next";

export default async function GetPlatforms(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { page, row, sort, apikey } = req.query;
  const resultsPerPage =
    parseInt(row as string) >= 1 ? parseInt(row as string) : 25;
  let pages = parseInt(page as string) >= 1 ? parseInt(page as string) - 1 : 0;
  try {
    await ConnectDB();
    const isAuth =
      process.env.API_KEY && apikey && process.env.API_KEY === apikey;

    if (!isAuth) return res.status(401).json({ error: "unauthorized" });
    const platforms = await PlatformSchema.find()
      .sort(`${sort ? "-createdAt" : "createdAt"}`)
      .limit(resultsPerPage)
      .skip(resultsPerPage * pages);

    const TotalPlatformsNumber = await PlatformSchema.countDocuments().exec();

    return res.json({
      resault: TotalPlatformsNumber,
      platforms,
    });
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
