"use client";

import Modal from "@/components/admin/modal";
import { ModeMoveStudent } from "@/dummy-data";
import { CloseModalStudent } from "@/lib/features/dashboard/studentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import ListRoomElement from "./list-room";

export default function ModalStudent() {
  const modalState = useAppSelector((state) => state.student.modal_student);
  const dispatch = useAppDispatch();
  const [selectedMode, setSelectedMode] = useState(ModeMoveStudent[0]);

  return (
    <Modal
      open={modalState.is_open}
      onClose={() => dispatch(CloseModalStudent())}
      title={
        modalState.type_modal === "move-student"
          ? "Move Student"
          : "Delete Student"
      }
    >
      {modalState.type_modal === "move-student" ? (
        <>
          <div className="mt-2 max-w-lg">
            <Listbox value={selectedMode} onChange={setSelectedMode}>
              <Label className="block text-base font-medium text-gray-900">
                Mode
              </Label>
              <div className="relative mt-1">
                <ListboxButton className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left text-base text-gray-900 ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="block truncate">{selectedMode.label}</span>
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
                  {ModeMoveStudent.map((data) => (
                    <ListboxOption
                      key={data.value}
                      value={data}
                      className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-blue-600 data-[focus]:text-white"
                    >
                      <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                        {data.label}
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
          <ListRoomElement />

          <div className="mt-5 flex justify-end gap-x-2 text-sm">
            <button
              onClick={() => dispatch(CloseModalStudent())}
              className="flex items-center rounded-md bg-gray-100 px-3 py-2 font-semibold text-black hover:bg-gray-200 active:bg-gray-300"
            >
              CANCEL
            </button>
            <button
              onClick={() => dispatch(CloseModalStudent())}
              className="flex items-center rounded-md bg-teal-600 px-3 py-2 font-semibold text-white hover:bg-teal-700 active:bg-teal-800"
            >
              MOVE
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="mb-3">
            Are you really sure you want to delete student
            {modalState.type_modal === "delete" && (
              <span className="font-semibold">
                {" " + modalState.student_info?.student_name}
              </span>
            )}
            ?
          </p>
          <div className="my-4 flex items-center justify-between rounded-md border border-red-300 bg-red-100 px-3 py-2">
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
          <div className="mt-5 flex justify-end gap-x-2 text-sm">
            <button
              onClick={() => dispatch(CloseModalStudent())}
              className="flex items-center rounded-md bg-gray-100 px-3 py-2 font-semibold text-black hover:bg-gray-200 active:bg-gray-300"
            >
              CANCEL
            </button>
            <button
              onClick={() => dispatch(CloseModalStudent())}
              className="flex items-center rounded-md bg-red-600 px-3 py-2 font-semibold text-white hover:bg-red-700 active:bg-red-800"
            >
              DELETE
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
