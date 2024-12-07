"use client";
import { useAppSelector } from "@/lib/hooks";

export default function UsernameHeader() {
  const username = useAppSelector((state) => state.user.username);

  return (
    <span className="mr-4 hidden whitespace-nowrap text-base font-medium capitalize sm:text-lg lg:inline-block">
      {username.length > 1 ? `Hai, ${username}` : "Selamat Datang"}
    </span>
  );
}
