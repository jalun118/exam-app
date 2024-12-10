"use client";

import { iStudent } from "@/lib/features/dashboard/studentSlice";
import { useState } from "react";
import FormMultipleInput from "./form-multiple-input";
import FormSingleInput from "./form-single-input";
import TableResultInputStudent from "./table-result-input-student";

interface editStudent {
  index: number;
  student: iStudent;
}

export default function ViewInputStudent() {
  const [page, setPage] = useState(0);
  const [EditStudent, SetEditStudent] = useState<editStudent | null>(null);

  function handleEdit(data: editStudent | null) {
    if (!data) {
      SetEditStudent(null);
    }

    if (data) {
      setPage(0);
      SetEditStudent(data);
    }
  }

  return (
    <div className="mt-4">
      <div>
        <div className="flex max-w-lg items-center justify-between">
          <nav
            className="flex divide-x divide-gray-400 overflow-hidden rounded-full border border-gray-400 transition"
            aria-label="Tabs"
            role="tablist"
          >
            <button
              type="button"
              onClick={() => setPage(0)}
              className={`py-1.5 pl-5 pr-3 text-black ${page === 0 ? "bg-blue-200/50 text-black" : ""}`}
              role="tab"
            >
              Single
            </button>
            <button
              type="button"
              onClick={() => setPage(1)}
              className={`py-1.5 pl-3 pr-5 text-black ${page === 1 ? "bg-blue-200/50" : ""}`}
              role="tab"
            >
              Multiple
            </button>
          </nav>
          <button className="rounded-lg bg-black px-4 py-2 text-base text-white">
            SAVE
          </button>
        </div>
        {page === 0 ? (
          <FormSingleInput
            getEditStudent={EditStudent}
            SetEmpty={() => SetEditStudent(null)}
          />
        ) : (
          <FormMultipleInput />
        )}
      </div>
      <div className="mt-5">
        <TableResultInputStudent SetEdit={(v) => handleEdit(v)} />
      </div>
    </div>
  );
}
