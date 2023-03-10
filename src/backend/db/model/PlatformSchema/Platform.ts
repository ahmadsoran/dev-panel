import { model, models, Schema } from "mongoose";
import PlatformsType from "../../../@types/Platform";

const Platforms = new Schema<PlatformsType>(
  {
    name: {
      type: String,
      unique: true,
    },
    isNewUpdateAvailable: false,
    numberOFcrashes: 0,
    NumberOFerrors: 0,
    NumberOFusers: 0,
    lastCrashReport: String,
    lastErrorReport: String,
    releaseVersion: String,
    platformType: {
      type: String,
      default: "Both",
      enum: ["Both", "ios", "android"],
    },
    build: {
      type: Schema.Types.ObjectId,
      ref: "builds",
    },
  },
  {
    timestamps: true,
  }
);

const PlatformSchema = models["platforms"] || model("platforms", Platforms);

export default PlatformSchema;
