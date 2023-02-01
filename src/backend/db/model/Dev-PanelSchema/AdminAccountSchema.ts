import { Schema } from "mongoose";
import { AdminAccountDataType } from "../../../@types/Admin-account";
import createModel from "../CreateModel";

const AdminAccount = new Schema<AdminAccountDataType>(
  {
    name: String,
    username: {
      type: String,
      unique: true,
    },
    password: String,
    device_udid: String,
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

const AdminAccountSchema = createModel("admin-account", AdminAccount);

export default AdminAccountSchema;
