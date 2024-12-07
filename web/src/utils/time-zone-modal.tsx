"use client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useState } from "react";

export default function TimeZoneModal() {
  const [isOpen, SetOpen] = useState(false);

  useEffect(() => {
    const options = Intl.DateTimeFormat().resolvedOptions();
    if (options.timeZone !== "Asia/Jakarta") {
      SetOpen(true);
    }
  }, []);

  function close() {}

  return (
    <Dialog open={isOpen} onClose={() => close()} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] relative w-full max-w-md rounded-xl border bg-slate-100 px-2 py-2 pb-4 duration-300 ease-out data-[closed]:opacity-0"
          >
            <div className="px-5 pt-3">
              <DialogTitle
                as="h3"
                className="truncate whitespace-nowrap text-lg font-medium text-black"
              >
                Peringatan
              </DialogTitle>
            </div>
            <div className="px-5 py-4">
              <p>
                Zona waktu anda tidak sesuai. ubah zona waktu pada pengaturan hp
                anda menjadi <span className="font-semibold">Asia/Jakarta</span>{" "}
                atau Zona waktu <span className="font-semibold">Jakarta</span>.
                setelah selesai kembali lagi untuk mencoba.
              </p>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
