import { PlatformOwner } from "@/backend/@types/Platform";
import WinstonLogger from "@/backend/db/logger/WinstonLogger";
import PlatformSchema from "@/backend/db/model/PlatformSchema/Platform";
import AddPlatformValidations from "@/backend/Validations/Add-PlatformValidations";
import { NextApiRequest, NextApiResponse } from "next";

export default async function AddPlatform(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    ownerName,
    ownerEmail,
    ownerPhone,
    releaseVersion,
    platformType,
  } = req.body;

  const owner: PlatformOwner = {
    name: ownerName,
    email: ownerEmail,
    phone_number: ownerPhone,
  };
  try {
    try {
      await AddPlatformValidations.validateAsync({
        name,
        owner,
        releaseVersion,
        platformType,
      });
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ error: error.message });
    }
    const addPlatform = await new PlatformSchema({
      name,
      owner,
      releaseVersion,
      platformType,
    }).save();

    if (addPlatform)
      return res.json({
        platform: `Platform ${name} added successfully`,
      });
  } catch (error) {
    if (error instanceof Error) {
      const isDuplicateErr = error.message.includes("duplicate");
      WinstonLogger({
        level: "error",
        msg: `error while adding Platform msg: ${error.message}`,
      });
      return res.status(isDuplicateErr ? 400 : 500).json({
        error: isDuplicateErr ? "This Platform exist" : "unkown error happen",
      });
    }
  }
}
