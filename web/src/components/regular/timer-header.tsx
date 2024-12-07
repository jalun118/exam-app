"use client";
import { useAppSelector } from "@/lib/hooks";
import { usePathname } from "next/navigation";

export default function TimerHeader() {
  const timer = useAppSelector((state) => state.timer.timer);
  const pathname = usePathname();

  if (pathname === "/join-test/question") {
    return (
      <span className="inline-flex select-none items-center gap-x-2 text-xl font-medium tabular-nums text-blue-600 lg:hidden">
        {timer}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </span>
    );
  }
  return (
    <span className="inline-block select-none whitespace-nowrap text-base font-medium tabular-nums sm:text-xl lg:hidden">
      Selamat Datang
    </span>
  );
}
