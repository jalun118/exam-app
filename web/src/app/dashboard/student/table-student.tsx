"use client";
import { ListStudents } from "@/dummy-data";
import {
  SetOpenModalStudent,
  ToggleSelectStudent,
} from "@/lib/features/dashboard/studentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function TableStudent() {
  const student_select = useAppSelector(
    (state) => state.student.student_select,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="-m-1.5 overflow-x-auto">
      <div className="inline-block min-w-full p-1.5 align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-400">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3 pl-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                ></th>
                <th
                  scope="col"
                  className="px-2 py-3 text-start text-xs font-medium uppercase text-gray-500 md:px-4 md:text-sm"
                >
                  Sequense
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
                        defaultChecked={student_select.includes(student.id)}
                        onChange={() =>
                          dispatch(ToggleSelectStudent({ id: student.id }))
                        }
                        className="size-5 shrink-0 rounded border-gray-400 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                      />
                      <label
                        htmlFor={"checkbox-" + student.id}
                        className="ms-3 text-gray-900 dark:text-gray-300"
                      ></label>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-2 py-2.5 text-sm tabular-nums text-gray-800 md:px-4 md:text-base">
                    {student.sequence}
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
                      onClick={() =>
                        dispatch(
                          SetOpenModalStudent({
                            info_student: {
                              class: student.student_class,
                              student_name: student.student_name,
                              id: student.id,
                            },
                            type_open: "delete",
                          }),
                        )
                      }
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
