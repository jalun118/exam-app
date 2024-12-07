import { PrefixDashboard } from "@/lib/features/dashboard/prefix-instance-dashboard";
import Link from "next/link";
import ScheduleView from "./schedule-view";

export default function SchedulePage() {
  return (
    <div>
      <header className="mb-7 dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Schedule
        </h1>
      </header>
      <div className="flex flex-col-reverse gap-y-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md flex-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-3.5">
              <svg
                className="size-4 shrink-0 text-gray-400 dark:text-white/60"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <input
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              aria-autocomplete="none"
              type="text"
              className="block w-full rounded-lg border-gray-400 bg-white py-2 pe-16 ps-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
              placeholder="Search"
            />
            <div className="pointer-events-none absolute inset-y-0 end-0 z-20 hidden items-center pe-1">
              <button
                type="button"
                className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </button>
            </div>
            <div className="pointer-events-none absolute inset-y-0 end-0 z-20 flex items-center pe-3 text-gray-400">
              <svg
                className="size-3 shrink-0 text-gray-400 dark:text-white/60"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              <span className="mx-1">
                <svg
                  className="size-3 shrink-0 text-gray-400 dark:text-white/60"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </span>
              <span className="text-xs">/</span>
            </div>
          </div>
        </div>
        <div className="flex">
          <Link
            href={PrefixDashboard("/schedule/new")}
            className="flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-2 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Create Schedule
          </Link>
        </div>
      </div>

      <div className="mt-5">
        <ScheduleView />
      </div>
    </div>
  );
}
