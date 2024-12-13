"use client";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
const listRowsPerPage = [10, 30, 50];

type EventPagination = {
  event: "rows-page" | "next-page" | "prev-page" | "first-page" | "last-page";
  rows_per_page: number;
};

type MetaPagination = {
  total_data: number;
  start_data: number;
  end_data: number;
};

export default function PaginationTable({
  paginationEvent,
  metaData,
}: {
  metaData: MetaPagination;
  paginationEvent: (event: EventPagination) => void;
}) {
  const [rowPerPage, setSelected] = useState(listRowsPerPage[0]);

  return (
    <div className="mt-3 border-y border-y-gray-400 py-3 sm:px-5">
      <div className="flex flex-row items-center justify-center gap-2 sm:justify-end">
        <div className="flex items-center justify-center gap-x-2">
          <div className="whitespace-nowrap text-sm">Rows per page:</div>
          <Listbox value={rowPerPage} onChange={setSelected}>
            <div>
              <ListboxButton className="inline-flex items-center gap-x-1 rounded-lg border border-gray-200 px-2 py-1 text-sm tabular-nums text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none">
                {rowPerPage}
                <svg
                  className="size-4 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-16 overflow-auto rounded-md border border-gray-200 bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
              >
                {listRowsPerPage.map((rows, idx) => (
                  <ListboxOption
                    key={idx}
                    value={rows}
                    onClick={() =>
                      paginationEvent({
                        event: "rows-page",
                        rows_per_page: rows,
                      })
                    }
                    className="group relative cursor-default select-none py-1 pl-1 pr-3 text-gray-900 hover:bg-gray-50 data-[focus]:bg-gray-100"
                  >
                    <span className="ml-1 block truncate text-sm font-normal group-data-[selected]:font-semibold">
                      {rows}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-blue-600 [.group:not([data-selected])_&]:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 12.75 6 6 9-13.5"
                        />
                      </svg>
                    </span>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
          <span className="mx-1 text-sm">
            {metaData.start_data} - {metaData.end_data} of {metaData.total_data}
          </span>
        </div>
        <nav className="flex items-center gap-x-1" aria-label="Pagination">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-transparent px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="first-page"
            onClick={() =>
              paginationEvent({
                event: "first-page",
                rows_per_page: rowPerPage,
              })
            }
          >
            <span className="sr-only">First Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0"
            >
              <path d="m17 18-6-6 6-6" />
              <path d="M7 6v12" />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-transparent px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="Previous"
            onClick={() =>
              paginationEvent({ event: "prev-page", rows_per_page: rowPerPage })
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-transparent px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="Next"
            onClick={() =>
              paginationEvent({ event: "next-page", rows_per_page: rowPerPage })
            }
          >
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="size-4 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-transparent px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
            aria-label="last-page"
            onClick={() =>
              paginationEvent({ event: "last-page", rows_per_page: rowPerPage })
            }
          >
            <span className="sr-only">Last Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0"
            >
              <path d="m7 18 6-6-6-6" />
              <path d="M17 6v12" />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  );
}
