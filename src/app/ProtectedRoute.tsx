import { ReactNode } from "react";
import swr from "swr";
import isAuth from "@/util/requests/GET/auth";
import Signin from "../components/signin";
type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { data, isLoading } = swr("auth", isAuth);
  if (!isLoading)
    if (!data) return <Signin />;
    else return children;
}
