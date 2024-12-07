"use client";

import { usePathname } from "next/navigation";

function BreadcrumbFormat(pageNameUrl: string): string {
  return pageNameUrl
    .replaceAll("-", " ")
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
}

export default function Breadcrumb() {
  const pathUrl = usePathname().split("/");

  if (pathUrl.length === 2) {
    return (
      <div className="z-20 border-y border-gray-400 bg-white px-4 sm:px-6 lg:hidden lg:px-8">
        <div className="flex items-center py-2">
          <ol className="flex items-center whitespace-nowrap">
            <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400 md:text-base">
              Application
              <svg
                className="mx-3 size-2.5 shrink-0 overflow-visible text-gray-400 dark:text-neutral-500"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
            </li>
            <li
              className="truncate text-sm font-semibold text-gray-800 dark:text-neutral-400 md:text-base"
              aria-current="page"
            >
              {BreadcrumbFormat(pathUrl[pathUrl.length - 1])}
            </li>
          </ol>
        </div>
      </div>
    );
  }

  if (pathUrl.length === 3) {
    return (
      <div className="z-20 border-y border-gray-400 bg-white px-4 sm:px-6 lg:hidden lg:px-8">
        <div className="flex items-center py-2">
          <ol className="flex items-center whitespace-nowrap">
            <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400 md:text-base">
              Application
              <svg
                className="mx-3 size-2.5 shrink-0 overflow-visible text-gray-400 dark:text-neutral-500"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                />
              </svg>
            </li>
            <li
              className="truncate text-sm font-semibold text-gray-800 dark:text-neutral-400 md:text-base"
              aria-current="page"
            >
              {BreadcrumbFormat(pathUrl[pathUrl.length - 1])}
            </li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="z-20 border-y border-gray-400 bg-white px-4 sm:px-6 lg:hidden lg:px-8">
      <div className="flex items-center py-2">
        <ol className="flex items-center whitespace-nowrap">
          <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400 md:text-base">
            Application
            <svg
              className="mx-3 size-2.5 shrink-0 overflow-visible text-gray-400 dark:text-neutral-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
          </li>
          <li className="text-sm">
            <div className="flex items-center text-gray-500">
              <svg
                className="size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="19" cy="12" r="1"></circle>
                <circle cx="5" cy="12" r="1"></circle>
              </svg>
              <svg
                className="mx-2 size-4 shrink-0 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </div>
          </li>
          <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400 md:text-base">
            {BreadcrumbFormat(pathUrl[pathUrl.length - 2])}
            <svg
              className="mx-3 size-2.5 shrink-0 overflow-visible text-gray-400 dark:text-neutral-500"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
          </li>
          <li
            className="truncate text-sm font-semibold text-gray-800 dark:text-neutral-400 md:text-base"
            aria-current="page"
          >
            {BreadcrumbFormat(pathUrl[pathUrl.length - 1])}
          </li>
        </ol>
      </div>
    </div>
  );
}
