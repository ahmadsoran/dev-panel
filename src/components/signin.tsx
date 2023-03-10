"use client";
import Button from "@/components/Button";
import API from "@/util/helper/API";
import { Typography } from "antd";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";

export default function Signin() {
  const passwordRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const [Error, setError] = useState("");
  const router = useRouter();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    try {
      if (username && password) {
        const data = await fetch("/api/auth/signin", {
          body: JSON.stringify({ username, password }),
          headers: API.RequestHeader,
          method: "post",
        });
        const res = await data.json();
        if (data.ok) window.location.reload();
        if (!data.ok) setError(res.error);
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <form onSubmit={submitHandler} method="post">
      <div className="grid place-items-center p-5 bg-neutral-900 h-full w-full">
        <div className="bg-neutral-600 p-5 grid place-items-center relative rounded-xl min-w-[1/2]">
          <h1 className="text-white text-xl font-medium my-3">Sign in</h1>
          <input
            type="text"
            className="bg-neutral-50 rounded-lg p-3 mb-3"
            autoComplete="off"
            placeholder="username"
            required
            minLength={4}
            ref={usernameRef}
          />
          <input
            type="password"
            className="bg-neutral-50 rounded-lg p-3"
            placeholder="passowrd"
            minLength={6}
            ref={passwordRef}
          />
          {Error && (
            <Typography className="text-red-600 mt-3">{Error}</Typography>
          )}
          <Button htmlType="submit">Sign in</Button>
        </div>
      </div>
    </form>
  );
}
