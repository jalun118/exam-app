import { useState } from "react";

interface keyAnswer {
  index_question: number;
  key: string;
  index_key: number;
}

export default function SidebarDetail({
  list_key,
  SetShowKey,
  show_key,
}: {
  list_key: keyAnswer[];
  show_key: boolean;
  SetShowKey: (value: boolean) => void;
}) {
  const [GetExpand, SetExpand] = useState(false);

  return (
    <div className="max-w-lg">
      <div className="flex flex-col rounded-xl border border-gray-400 bg-white p-4 shadow-sm md:p-5">
        <h2 className="flex select-none items-center gap-x-3 text-base font-bold md:text-xl">
          <span>Key Answer</span>
          {show_key ? (
            <svg
              onClick={() => SetShowKey(false)}
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
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          ) : (
            <svg
              onClick={() => SetShowKey(true)}
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
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
        </h2>
        <div className="mt-3">
          <div
            className={`overflow-hidden ${!GetExpand ? "max-h-36" : "max-w-none"} relative`}
          >
            <table className="min-w-full divide-y divide-gray-400">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-start text-sm font-medium capitalize text-gray-500 dark:text-neutral-500 md:text-base"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="flex items-center justify-between px-6 py-3 text-start text-sm font-medium capitalize text-gray-500 dark:text-neutral-500 md:text-base"
                  >
                    Key
                    <svg
                      style={{ rotate: !GetExpand ? "0deg" : "180deg" }}
                      onClick={() => SetExpand((prev) => !prev)}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                      className="size-5 transition-all duration-300 ease-in-out"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-400">
                {list_key.map((val) => (
                  <tr key={val.index_question}>
                    <td className="whitespace-nowrap px-6 py-4 text-base font-medium text-gray-800 dark:text-neutral-200">
                      {val.index_question}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-base text-gray-800 dark:text-neutral-200">
                      {val.key}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!GetExpand && list_key.length > 1 && (
              <div className="absolute bottom-0 h-8 w-full bg-gradient-to-t from-white dark:from-slate-900"></div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col rounded-xl border bg-white p-4 shadow-sm md:p-5">
        <h2 className="flex select-none items-center gap-x-3 text-base font-bold md:text-xl">
          Send Feedback
        </h2>
        <div className="mt-3">
          <textarea
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            className="block min-h-28 w-full rounded-lg border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 md:text-base"
            rows={3}
            placeholder="Send Feedback to Author"
          ></textarea>
          <div className="mt-4 flex justify-end">
            <button className="rounded-md bg-black px-4 py-2 text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
