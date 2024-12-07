import { ListStudents } from "@/dummy-data";
import Link from "next/link";

export default function StudentPage() {
  return (
    <div>
      <header className="mb-7 dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Student List
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
            href="#"
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
            Add Student
          </Link>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="inline-block min-w-full p-1.5 align-middle">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-400">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pl-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                      >
                        #
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                      >
                        Username
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                      >
                        Password
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                      >
                        Class
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
                    {ListStudents.slice(0, 5).map((student) => (
                      <tr key={student.id}>
                        <td className="max-w-48 whitespace-nowrap py-2.5 pl-3 text-sm font-medium text-gray-800 md:px-4 md:text-base">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={"checkbox-" + student.id}
                              className="size-5 shrink-0 rounded border-gray-400 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                            />
                            <label
                              htmlFor={"checkbox-" + student.id}
                              className="ms-3 text-gray-900 dark:text-gray-300"
                            ></label>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-sm text-gray-800 md:px-4 md:text-base">
                          {student.student_name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-sm text-gray-800 md:px-4 md:text-base">
                          {student.username}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-sm text-gray-800 md:px-4 md:text-base">
                          {student.password}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-sm text-gray-800 md:px-4 md:text-base">
                          {student.student_class}
                        </td>
                        <td className="flex justify-end gap-x-1 whitespace-nowrap px-2 py-2.5 text-end text-sm font-medium md:px-2 md:text-base">
                          <button className="inline-flex items-center justify-center rounded-full p-1 outline-none ring-0 ring-gray-200 transition duration-75 ease-in-out active:bg-gray-200 active:ring-4">
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
                          </button>
                          <button className="inline-flex items-center justify-center rounded-full p-1 outline-none ring-0 ring-gray-200 transition duration-75 ease-in-out active:bg-gray-200 active:ring-4">
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
                          </button>
                          <button
                            type="button"
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

          <div className="mt-3 border-y border-y-gray-400 px-5 py-3">
            <div className="grid justify-center gap-2 sm:flex sm:items-center sm:justify-end">
              <div className="flex items-center justify-center gap-x-3">
                <div className="text-sm">Rows per page:</div>
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1 rounded-lg border border-gray-200 px-2.5 py-1.5 text-sm text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  5 page
                  <svg
                    className="size-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
              <div className="mx-3 flex items-center text-sm">
                <span>1 - 4 of 10</span>
              </div>
              <nav
                className="flex items-center gap-x-1"
                aria-label="Pagination"
              >
                <button
                  type="button"
                  className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg border border-transparent px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                  aria-label="Previous"
                >
                  <svg
                    className="size-3.5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                  <span className="sr-only">Previous</span>
                </button>
                <div className="flex items-center gap-x-1">
                  <button
                    type="button"
                    className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-white dark:focus:bg-white/10"
                    aria-current="page"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                  >
                    2
                  </button>
                  <button
                    type="button"
                    className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                  >
                    3
                  </button>
                  <button
                    type="button"
                    className="flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-transparent px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                  >
                    8
                  </button>
                </div>
                <button
                  type="button"
                  className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center gap-x-2 rounded-lg border border-transparent px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                  aria-label="Next"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="size-3.5 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
