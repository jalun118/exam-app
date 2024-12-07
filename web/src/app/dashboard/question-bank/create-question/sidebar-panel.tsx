"use client";

import { useState } from "react";

interface tableKey {
  index_question: number;
  key: string;
}

export default function SidebarPanel() {
  const [tableVal, SetTable] = useState<tableKey[]>([]);
  const [hideKey, SetHide] = useState(true);

  function HandleChange(value: string) {
    const tempArr: tableKey[] = [];

    value.split("\n").forEach((listKey) => {
      let dataKey: string[] = [];
      if (listKey.includes("\t")) {
        dataKey = listKey.split("\t");
      } else {
        dataKey = listKey.trim().split(" ");
      }

      if (dataKey.length > 1) {
        tempArr.push({
          index_question: parseFloat(dataKey[0]),
          key: dataKey[1],
        });
      }
    });
    SetTable(tempArr);
  }

  return (
    <div className="max-w-lg">
      <div className="flex flex-col rounded-xl border border-gray-400 bg-white p-4 shadow-sm md:p-5">
        <h2 className="flex select-none items-center gap-x-3 text-base font-bold md:text-xl">
          <span>Key Answer</span>
        </h2>
        <div className="mt-4">
          <textarea
            onChange={(e) => HandleChange(e.target.value)}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            className="block min-h-14 w-full rounded-lg border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 md:text-base"
            rows={3}
            placeholder="Paste Key"
          ></textarea>
        </div>
        <div className="mt-3">
          <div
            className={`overflow-hidden ${hideKey ? "max-h-36" : "max-w-none"} relative`}
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
                      style={{ rotate: hideKey ? "0deg" : "180deg" }}
                      onClick={() => SetHide((prev) => !prev)}
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
                {tableVal.map((val) => (
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

            {hideKey && tableVal.length > 1 && (
              <div className="absolute bottom-0 h-8 w-full bg-gradient-to-t from-white dark:from-slate-900"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
