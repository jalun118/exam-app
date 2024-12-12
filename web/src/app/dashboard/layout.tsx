"use client";

import Header from "@/components/admin/Header";
import Logo from "@/components/admin/Logo";
import SideBar from "@/components/admin/SideBar";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [openSideBar, SetOpenSidebar] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    SetOpenSidebar(false);
  }, [pathname]);

  return (
    <div>
      <Header onOpenSidebar={(b) => SetOpenSidebar(b)} />
      <div
        id="application-sidebar"
        className="fixed inset-y-0 start-0 z-40 hidden h-full w-80 border-e border-gray-400 bg-white px-4 transition-all duration-300 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0"
      >
        <SideBar logo={<Logo />} />
      </div>

      <div className="w-full lg:ps-80">
        <div className="p-4 md:p-8">{children}</div>
      </div>

      <Dialog
        open={openSideBar}
        onClose={SetOpenSidebar}
        className="relative z-[40]"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 data-[closed]:opacity-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
              <DialogPanel className="pointer-events-auto relative w-screen max-w-xs transform data-[closed]:-translate-x-full sm:duration-700">
                <TransitionChild>
                  <div className="absolute right-0 top-0 -mr-8 flex pl-2 pt-4 data-[closed]:opacity-0 sm:-mr-10 sm:pl-4">
                    <button
                      type="button"
                      onClick={() => SetOpenSidebar(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Close panel</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18 18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </TransitionChild>
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-gray-900">
                      <Logo />
                    </DialogTitle>
                  </div>
                  <div className="relative flex-1 px-4 sm:px-6">
                    <SideBar />
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
