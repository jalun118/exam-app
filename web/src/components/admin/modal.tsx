"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode } from "react";
interface iModalProps {
  children: ReactNode;
  open: boolean;
  title: string;
  onClose: (value: boolean) => void;
}

export default function Modal({ children, open, onClose, title }: iModalProps) {
  return (
    <Dialog open={open} onClose={(v) => onClose(v)} className="relative z-40">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] relative w-full max-w-md rounded-xl border bg-white px-2 py-2 pb-4 data-[closed]:opacity-0"
          >
            <div className="flex items-center justify-between px-5 pt-2">
              <DialogTitle
                as="h3"
                className="truncate whitespace-nowrap text-xl font-medium text-black"
              >
                {title}
              </DialogTitle>
            </div>
            <div className="mt-2 px-5 text-base">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
