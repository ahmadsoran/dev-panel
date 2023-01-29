import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import WinstonLogger from "@/backend/db/logger/WinstonLogger";
import SignInDataValidation from "@/backend/Validations/SignIn";
import AdminAccountSchema from "@/backend/db/model/Dev-PanelSchema/AdminAccountSchema";
import bcrypt from "bcrypt";
import ConnectDB from "@/backend/db/connection/connection";
const Options: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const username = credentials?.username || "";
        const password = credentials?.password || "";
        try {
          ConnectDB();
          try {
            await SignInDataValidation.validateAsync({ username, password });
          } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
          }
          ///
          console.log(
            "🚀 ~ file: [...nextauth].ts:30 ~ authorize ~ AdminData",
            "AdminData"
          );
          const AdminData = await AdminAccountSchema.findOne({
            username,
          });
          console.log(
            "🚀 ~ file: [...nextauth].ts:30 ~ authorize ~ AdminData",
            AdminData
          );
          ///
          if (!AdminData) throw new Error("User not found!");
          const isPasswordVaild = await bcrypt.compare(
            password,
            AdminData?.password
          );
          ///
          if (!isPasswordVaild) throw new Error("password or username invaild");

          return AdminData;
        } catch (error) {
          if (error instanceof Error) {
            WinstonLogger({
              level: "error",
              msg: `error while user try sign-in msg:${error.message}`,
            });
            console.log(
              "🚀 ~ file: [...nextauth].ts:46 ~ authorize ~ error.message}",
              error.message
            );

            throw new Error("password or username invaild");
          }
        }
      },
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
    }),
  ],

  secret: process.env.PRV_KEY,
};

export default NextAuth(Options);
