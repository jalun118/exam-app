import { GetBadgeStatus } from "@/components/admin/badge-status";
import { CheckStatusSchedule } from "@/lib/features/dashboard/check-status-schedule";
import { PrefixDashboard } from "@/lib/features/dashboard/prefix-instance-dashboard";
import { FormatDate } from "@/utils/date";
import { iSchedule } from "@/utils/type-define";
import Link from "next/link";

export default function TableSchedule({
  SetSelectDelete,
  data,
}: {
  SetSelectDelete: (data: iSchedule | null) => void;
  data: iSchedule[];
}) {
  return (
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
              {data.map((schedule) => (
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
                      CheckStatusSchedule(
                        schedule.date_start,
                        schedule.date_end,
                      ),
                    )}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm tabular-nums text-gray-800 md:px-4 md:text-base">
                    {schedule.room}
                  </td>
                  <td className="flex gap-x-1 whitespace-nowrap px-2 py-4 text-end text-sm font-medium md:px-2 md:text-base">
                    <Link
                      href={PrefixDashboard("/schedule/" + schedule.id)}
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
                      href={PrefixDashboard("/schedule/" + schedule.id + "/edit")}
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
  );
}
