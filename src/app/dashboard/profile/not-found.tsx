import Image from "next/image";

export default function NotFound() {
  return (
    <div className="grid place-items-center w-full h-full">
      <Image
        src="/static/assets/img/notfound.png"
        width={200}
        height={200}
        alt="not found png"
      />
      <h1 className="text-neutral-100">Profile not found!</h1>
    </div>
  );
}
