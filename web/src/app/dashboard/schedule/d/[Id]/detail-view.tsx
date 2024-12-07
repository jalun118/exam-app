"use client";
import { StudentWithScore } from "@/dummy-data";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import CardDescriptionSchedule from "./card-detail-schedule";
import CardInfoSchedule from "./card-info-schedule";
import CardStudent from "./card-student";

export default function DetailView({ id_schedule }: { id_schedule: string }) {
  const [modalType, SetModalType] = useState<"delete" | "reset" | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
        <CardDescriptionSchedule />
        <CardInfoSchedule
          SetIsDelete={() => SetModalType("delete")}
          id_schedule={id_schedule}
          SetIsReset={() => SetModalType("reset")}
          student_length={StudentWithScore.length}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Result Submit</h2>
        <div className="mt-3 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {StudentWithScore.map((data, idx) => (
            <CardStudent key={data.id} data={data} index={idx} />
          ))}
        </div>
      </div>
      <Dialog
        open={modalType !== null}
        onClose={() => SetModalType(null)}
        className="relative z-40"
      >
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
                  {modalType === "reset" ? "Reset Submit" : "Delete Schedule"}
                </DialogTitle>
              </div>
              <div className="mt-3 px-5 text-base">
                <p className="mb-2">
                  {modalType === "reset"
                    ? "Are you really sure you want to reset submit"
                    : "Are you really sure you want to delete schedule"}{" "}
                  <span className="font-semibold">ULANGAN MTK</span>?
                </p>
                <div className="my-3 flex items-center justify-between rounded-md border border-red-300 bg-red-100 px-3 py-2">
                  <div className="text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ms-3 font-medium text-red-600">
                    This action will delete the value that has been entered.
                  </div>
                </div>
                <p>This action cannot be undone.</p>
                <div className="mt-2">
                  <label
                    htmlFor="write-name"
                    className="mb-1 block font-medium"
                  >
                    Write the schedule name to confirm
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    autoCorrect="off"
                    aria-autocomplete="none"
                    spellCheck={false}
                    id="write-name"
                    className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                  />
                </div>
                <div className="mt-1">
                  <span className="bg-gray-100 px-1 font-mono text-base">
                    ULANGAN MTK
                  </span>
                </div>
                <div className="mt-5 flex justify-end gap-x-2 text-sm">
                  <button
                    onClick={() => SetModalType(null)}
                    className="flex items-center rounded-md bg-gray-100 px-3 py-2 font-semibold text-black hover:bg-gray-200 active:bg-gray-300"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => SetModalType(null)}
                    className="flex items-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white hover:bg-red-700 active:bg-red-800"
                  >
                    {modalType === "reset" ? "RESET" : "DELETE"}
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
