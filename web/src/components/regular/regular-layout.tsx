"use client";
import TimeZoneModal from "@/utils/time-zone-modal";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import MainHeader from "./MainHeader";

const allowPath = ["/", "/join-test", "/join-test/question"];

export default function RegularLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (allowPath.includes(pathname)) {
    return (
      <div className="bg-white">
        <MainHeader />
        <main className="relative">{children}</main>
        <TimeZoneModal />
      </div>
    );
  }
  return children;
}
