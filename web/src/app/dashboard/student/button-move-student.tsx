"use client";
import { SetOpenModalStudent } from "@/lib/features/dashboard/studentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

export default function ButtonMoveStudent() {
  const studentSelectLength = useAppSelector(
    (state) => state.student.student_select.length,
  );
  const dispatch = useAppDispatch();

  if (studentSelectLength < 1) {
    return null;
  }

  return (
    <button
      onClick={() =>
        dispatch(
          SetOpenModalStudent({
            type_open: "move-student",
            info_student: null,
          }),
        )
      }
      className="flex items-center gap-x-2 rounded-lg border border-transparent bg-teal-600 px-2 py-1.5 text-sm font-medium text-white hover:bg-teal-700 focus:bg-teal-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
        />
      </svg>
      Move
    </button>
  );
}
