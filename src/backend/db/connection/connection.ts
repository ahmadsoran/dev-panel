import mongoose from "mongoose";

mongoose.Promise = global.Promise;
export default async function ConnectDB() {
  try {
    mongoose.set({ strictQuery: true });

    await mongoose.connect("mongodb://localhost:27017/platformDB");
  } catch (error) {
    throw error;
  }
}
