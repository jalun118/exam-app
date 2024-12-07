"use client";
import { ListRoom } from "@/dummy-data";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function InputIdPackage({ SetOpen }: { SetOpen: (value: boolean) => void }) {
  const query = useSearchParams();
  const questionId = query.get("question");

  return (
    <div className="relative">
      <input
        type="text"
        defaultValue={questionId ?? ""}
        autoComplete="off"
        autoCorrect="off"
        aria-autocomplete="none"
        spellCheck={false}
        id="id-package"
        className="block w-full rounded-lg border border-gray-400 px-3 py-2 pe-24 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        placeholder="Juqxn_Lid0"
      />
      <button
        onClick={() => SetOpen(true)}
        className="absolute inset-y-0 end-0 m-1 rounded-lg border px-3 py-1 shadow transition-all ease-in-out active:shadow-inner"
      >
        Check
      </button>
    </div>
  );
}

export default function FormSchedule() {
  const [selected, setSelected] = useState(ListRoom[0]);
  const [getOpen, SetOpen] = useState(false);
  const [isMultiRoom, SetMultiRoonm] = useState(false);

  return (
    <div>
      <div className="max-w-lg">
        <label htmlFor="title-schedule" className="mb-2 block font-medium">
          Title Schedule
        </label>
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          aria-autocomplete="none"
          spellCheck={false}
          id="title-schedule"
          className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          placeholder="daily exam math"
        />
      </div>
      <div className="mt-4 max-w-lg">
        <label htmlFor="id-package" className="mb-2 block font-medium">
          ID Package
        </label>
        <Suspense
          fallback={
            <div className="flex w-full justify-center rounded-lg border border-gray-400 px-3 py-2 pe-24 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50">
              <span
                className="inline-block size-7 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </span>
            </div>
          }
        >
          <InputIdPackage SetOpen={(v) => SetOpen(v)} />
        </Suspense>
      </div>
      {getOpen && (
        <div className="mt-5 max-w-lg">
          <div className="flex flex-col rounded-xl border border-gray-400 bg-white p-4 shadow-sm md:p-5">
            <h3 className="text-xl font-bold">Ulangan Harian</h3>
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
      )}
      <div className="mt-5 max-w-lg">
        <div className="flex justify-center rounded-xl border border-gray-400 bg-white p-4 shadow-sm md:p-5">
          <span
            className="inline-block size-7 animate-spin rounded-full border-[3px] border-current border-t-transparent text-blue-600 dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </span>
        </div>
      </div>
      <div className="mt-5 max-w-lg">
        <div className="flex justify-center rounded-xl border border-gray-400 bg-white p-4 shadow-sm md:p-5">
          <span className="font-semibold text-red-500">Package Not Found</span>
        </div>
      </div>
      <div className="mt-4 max-w-lg">
        <h2 className="mb-3 block font-medium">Option Schedule</h2>
        <div className="flex flex-col gap-y-4">
          <label className="inline-flex items-center md:cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              defaultChecked
            />
            <div className="relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
            <span className="ms-3 text-gray-900 dark:text-gray-300">
              Randomize Question
            </span>
          </label>

          <label className="inline-flex items-center md:cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="peer sr-only"
              defaultChecked
            />
            <div className="relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
            <span className="ms-3 text-gray-900 dark:text-gray-300">
              Anti Cheat
            </span>
          </label>

          <label className="inline-flex items-center md:cursor-pointer">
            <input
              type="checkbox"
              className="peer sr-only"
              defaultChecked={isMultiRoom}
              onChange={() => SetMultiRoonm((prev) => !prev)}
            />
            <div className="relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
            <span className="ms-3 text-gray-900 dark:text-gray-300">
              Many Room
            </span>
          </label>
        </div>
      </div>
      {isMultiRoom ? (
        <div className="mt-4 max-w-lg">
          <h3 className="block text-base font-medium text-gray-900">Room</h3>
          <div className="mt-2 flex flex-col gap-y-2">
            {ListRoom.map((value) => (
              <div className="flex items-center" key={value.id}>
                <input
                  type="checkbox"
                  id={
                    "checkbox-" +
                    value.room_name.toLowerCase().replaceAll(" ", "-")
                  }
                  className="size-5 shrink-0 rounded border-gray-400 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                />
                <label
                  htmlFor={
                    "checkbox-" +
                    value.room_name.toLowerCase().replaceAll(" ", "-")
                  }
                  className="ms-3 text-gray-900 dark:text-gray-300"
                >
                  {value.room_name}
                </label>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 max-w-lg">
          <Listbox value={selected} onChange={setSelected}>
            <Label className="block text-base font-medium text-gray-900">
              Room
            </Label>
            <div className="relative mt-2">
              <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-base text-gray-900 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="block truncate">{selected.room_name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-gray-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in"
              >
                {ListRoom.map((person) => (
                  <ListboxOption
                    key={person.id}
                    value={person}
                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
                  >
                    <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                      {person.room_name}
                    </span>

                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="size-5"
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
        </div>
      )}

      <div className="mt-4 max-w-lg">
        <label
          htmlFor="giving-question-count"
          className="mb-2 block font-medium"
        >
          Giving Question Count (optional)
        </label>
        <input
          type="text"
          autoComplete="off"
          autoCorrect="off"
          aria-autocomplete="none"
          spellCheck={false}
          id="giving-question-count"
          className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          placeholder="20"
        />
      </div>

      <div className="mt-4 max-w-lg">
        <label htmlFor="start-schedule" className="mb-2 block font-medium">
          Start Exam Date
        </label>
        <input
          type="datetime-local"
          autoComplete="off"
          autoCorrect="off"
          aria-autocomplete="none"
          spellCheck={false}
          id="start-schedule"
          className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        />
      </div>

      <div className="mt-4 max-w-lg">
        <label htmlFor="max-schedule" className="mb-2 block font-medium">
          Maximum Exam Date
        </label>
        <input
          type="datetime-local"
          autoComplete="off"
          autoCorrect="off"
          aria-autocomplete="none"
          spellCheck={false}
          id="max-schedule"
          className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
        />
      </div>

      <div className="mt-4 max-w-lg">
        <label htmlFor="duration-exam" className="mb-2 block font-medium">
          Duration Exam (Minute)
        </label>
        <input
          type="number"
          autoComplete="off"
          autoCorrect="off"
          aria-autocomplete="none"
          spellCheck={false}
          id="duration-exam"
          className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
          placeholder="30"
        />
      </div>

      <div className="mt-6">
        <button className="rounded-md border bg-black px-4 py-1.5 text-white">
          Save
        </button>
      </div>
    </div>
  );
}
