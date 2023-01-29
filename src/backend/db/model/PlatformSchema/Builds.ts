import { model, models, Schema } from "mongoose";
import { PlatformBuild } from "../../../@types/PlatformBuild";

const PlatfomrBuilds = new Schema<PlatformBuild>({
  release_version: String,
  pre_realseversion: {
    type: Schema.Types.ObjectId,
    ref: "pre-release",
  },
});

const PlatformBuildsSchema =
  models["platform-builds"] || model("platform-builds", PlatfomrBuilds);

export default PlatformBuildsSchema;
