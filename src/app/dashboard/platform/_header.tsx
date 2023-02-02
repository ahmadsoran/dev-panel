"use client";
import { useRouter, usePathname } from "next/navigation";
import { KeyboardEvent, useRef } from "react";
import { BiSearchAlt } from "react-icons/bi";
export default function Header() {
  const router = useRouter();
  const path = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  function SearchInputHandelr(e: KeyboardEvent<HTMLInputElement>) {
    const inputVal = inputRef.current?.value;
    const key = e.key;
    if (key === "Enter" && path) router.push(`${path}?search=${inputVal}`);
  }

  return (
    <div className="flex justify-between items-center ">
      <div className="bg-neutral-600 px-2 rounded-md flex w-1/6 items-center transition-all ease-linear focus-within:w-full">
        <input
          type="search"
          className="p-2 text-white w-full"
          placeholder="Search"
          onKeyDown={SearchInputHandelr}
          ref={inputRef}
          onClick={() => inputRef.current?.focus()}
        />
        <BiSearchAlt
          onClick={() =>
            router.push(path + "?search=" + inputRef.current?.value)
          }
          size={24}
          className="cursor-pointer hover:scale-125  transition-transform text-white opacity-70 hover:opacity-100"
        />
      </div>
    </div>
  );
}
