"use client";

import { GetBadgeStatus } from "@/components/admin/badge-status";
import { PrefixDashboard } from "@/lib/features/dashboard/prefix-instance-dashboard";
import { FormatDate } from "@/utils/date";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";

interface iSchedule {
  id: string;
  name: string;
  date_start: string;
  date_end: string;
  duration: number;
  room: string;
}

const dataListSchedule: iSchedule[] = [
  {
    id: "75fe2a78-adcb-4ed0-9aea-23fc2f85ec2b",
    name: "cupidatat tempor sint nisi",
    date_start: "2016-12-05T06:00:59",
    date_end: "2021-09-28T07:19:56",
    duration: 46,
    room: "room-01",
  },
  {
    id: "b7c12a37-cc3f-439b-a5a8-92906387efa2",
    name: "id veniam laboris velit",
    date_start: "2024-11-07T20:00:00",
    date_end: "2024-12-26T02:52:22",
    duration: 80,
    room: "exprerimental",
  },
  {
    id: "961e3337-3120-4e96-b6fa-df9ce1a8909c",
    name: "non aute est laboris",
    date_start: "2025-08-13T11:37:25",
    date_end: "2026-01-05T09:13:49",
    duration: 103,
    room: "room-03",
  },
];

function CheckStatus(
  date_start: string,
  date_end: string,
): "pending" | "ongoing" | "finish" {
  const dateEnd = new Date(date_end);
  const dateStart = new Date(date_start);
  const dateNow = new Date();

  if (
    dateNow.valueOf() < dateEnd.valueOf() &&
    dateNow.valueOf() > dateStart.valueOf()
  ) {
    return "ongoing";
  }

  if (dateNow.valueOf() > dateEnd.valueOf()) {
    return "finish";
  }

  if (dateNow.valueOf() < dateEnd.valueOf()) {
    return "pending";
  }

  return "finish";
}

export default function ScheduleView() {
  const [SelectDelete, SetSelectDelete] = useState<iSchedule | null>(null);
  return (
    <div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="inline-block min-w-full p-1.5 align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-400">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      NAME
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      Time Start
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      Time End
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      Duration
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      Room
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-end text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-400">
                  {dataListSchedule.map((schedule) => (
                    <tr key={schedule.id}>
                      <td className="max-w-48 truncate whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-800 md:px-4 md:text-base">
                        {schedule.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 md:px-4 md:text-base">
                        {FormatDate(schedule.date_start, schedule.date_end)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm tabular-nums text-gray-800 md:px-4 md:text-base">
                        {new Date(schedule.date_start).toLocaleTimeString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm tabular-nums text-gray-800 md:px-4 md:text-base">
                        {new Date(schedule.date_end).toLocaleTimeString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm tabular-nums text-gray-800 md:px-4 md:text-base">
                        {schedule.duration} Minute
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 md:px-4 md:text-base">
                        {GetBadgeStatus(
                          CheckStatus(schedule.date_start, schedule.date_end),
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm tabular-nums text-gray-800 md:px-4 md:text-base">
                        {schedule.room}
                      </td>
                      <td className="flex gap-x-1 whitespace-nowrap px-2 py-4 text-end text-sm font-medium md:px-2 md:text-base">
                        <Link
                          href={PrefixDashboard("/schedule/d/" + schedule.id)}
                          className="inline-flex items-center justify-center rounded-full p-1 outline-none ring-0 ring-gray-200 transition duration-75 ease-in-out active:bg-gray-200 active:ring-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                          </svg>
                        </Link>
                        <Link
                          href={PrefixDashboard("/schedule/e/" + schedule.id)}
                          className="inline-flex items-center justify-center rounded-full p-1 outline-none ring-0 ring-gray-200 transition duration-75 ease-in-out active:bg-gray-200 active:ring-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                            />
                          </svg>
                          <span className="sr-only">Edit Button</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => SetSelectDelete(schedule)}
                          className="inline-flex items-center justify-center rounded-full p-1 outline-none ring-0 ring-gray-200 transition duration-75 ease-in-out active:bg-gray-200 active:ring-4"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="currentColor"
                            className="size-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                          <span className="sr-only">Delete Button</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={SelectDelete !== null}
        onClose={() => SetSelectDelete(null)}
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
                  Delete Schedule
                </DialogTitle>
              </div>
              <div className="mt-2 px-5 text-base">
                <p className="mb-2">
                  Are you really sure you want to delete schedule{" "}
                  <span className="font-semibold">{SelectDelete?.name}</span>?
                </p>
                <div className="my-2 flex items-center justify-between rounded-md border border-red-300 bg-red-100 px-3 py-2">
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
                    {SelectDelete?.name}
                  </span>
                </div>
                <div className="mt-5 flex justify-end gap-x-2 text-sm">
                  <button
                    onClick={() => SetSelectDelete(null)}
                    className="flex items-center rounded-md bg-gray-100 px-3 py-2 font-semibold text-black hover:bg-gray-200 active:bg-gray-300"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={() => SetSelectDelete(null)}
                    className="flex items-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white hover:bg-red-700 active:bg-red-800"
                  >
                    DELETE
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
