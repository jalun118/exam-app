import { PrefixDashboard } from "@/lib/features/dashboard/prefix-instance-dashboard";
import Link from "next/link";

export default function CardInfoSchedule({
  student_length,
  id_schedule,
  SetIsDelete,
}: {
  student_length: number;
  id_schedule: string;
  SetIsDelete: (val: boolean) => void;
}) {
  return (
    <div className="col-span-6">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="col-span-2">
          <div className="flex w-fit divide-x divide-gray-400 rounded-lg border border-gray-400 px-3 py-3">
            <div className="mr-3">
              <Link
                href={PrefixDashboard("/schedule/e/" + id_schedule)}
                className="inline-flex items-center justify-center rounded-full px-2 py-1 outline-none ring-0 ring-gray-200 transition duration-75 ease-in-out active:bg-gray-200 active:ring-4"
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
                <span className="ms-2">Edit</span>
              </Link>
            </div>
            <div>
              <button
                type="button"
                onClick={() => SetIsDelete(true)}
                className="ml-3 inline-flex items-center justify-center rounded-full px-2 py-1 outline-none ring-0 ring-gray-200 transition duration-75 ease-in-out active:bg-gray-200 active:ring-4"
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
                <span className="ms-2">Delete</span>
              </button>
            </div>
          </div>
        </div>
        <div className="relative flex items-center gap-x-3 rounded-xl border border-l-8 border-gray-400 border-l-blue-500 py-2 pl-3 pr-5">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-600">Key Room</h2>
            <p className="mt-1 text-2xl font-semibold">ABC123</p>
            <div className="text-sm text-red-500">
              Expired At
              <span className="block font-semibold tabular-nums">
                {new Date(2024, 0, 1).toLocaleString()}
              </span>
            </div>
          </div>
          <button className="ring-o absolute right-2 top-2 rounded-full p-1 ring-blue-100 transition duration-75 ease-in active:bg-blue-100 active:ring-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            <span className="sr-only">refresh token</span>
          </button>
        </div>
        <div>
          <div className="flex items-center gap-x-3 rounded-xl border border-l-8 border-gray-400 border-l-green-500 py-4 pl-3 pr-5">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-600">Submit</h2>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {student_length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-2 rounded-xl border border-gray-400 p-4">
          <h2 className="text-lg font-semibold">Extend Package</h2>
          <div className="mt-5 max-w-lg">
            <div className="flex flex-col rounded-xl border border-gray-400 bg-white p-4 md:p-5">
              <Link
                href="/otw"
                className="block text-xl font-bold text-blue-400 active:underline"
              >
                Ulangan Harian
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-0.5 inline-block size-5"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </Link>
              <div className="flex items-center justify-between">
                <div className="relative mt-4 flex items-center gap-x-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-12 rounded-full text-gray-400"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="text-base">
                    <p className="font-semibold text-gray-900">
                      <a href="#">
                        <span className="absolute inset-0" />
                        Mnatap Jiwa
                      </a>
                    </p>
                    <p className="text-gray-600">MTK</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
