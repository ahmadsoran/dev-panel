import { model, models, Schema } from "mongoose";
import { UserErrors } from "../../../@types/User";

const UserErrors = new Schema<UserErrors>(
  {
    cause: String,
    informedBy: {
      type: Schema.Types.ObjectId,
      ref: "admin-account",
    },
    priority: {
      type: String,
      default: "normal",
      enum: ["normal", "urgent", "critical"],
    },
    status: String,
    times: Number,
  },
  { timestamps: true }
);

const ErrorsSchema = models["user-errors"] || model("user-errors", UserErrors);

export default ErrorsSchema;
