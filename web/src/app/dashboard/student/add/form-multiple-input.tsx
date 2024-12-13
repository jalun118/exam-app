import {
  AddMultiStudent,
  iStudent,
} from "@/lib/features/dashboard/studentSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useState } from "react";

//
// Example Multiple data
//
// | sequence | name         | username     | password | class name |
// | -------- | ------------ | ------------ | -------- | ---------- |
// | 1        | jenny sunda  | jenny_sun123 | jenny124 | 11 FA      |
// | 2        | kuda jemping | kuda_jmpi212 | kuda1489 | 11 FA      |
//
export default function FormMultipleInput() {
  const dispatch = useAppDispatch();
  const [valueTextData, SetTextData] = useState("");
  const [textError, SetTextError] = useState({
    is_error: false,
    message: "",
  });

  function handleChangeText(value: string) {
    SetTextData(value);
    SetTextError({ is_error: false, message: "" });
  }

  function handleImport() {
    let isError = false;

    const tempData: iStudent[] = [];

    valueTextData.split("\n").forEach((student, idx) => {
      const fields = student.split("\t");

      if (fields.length < 5 && fields.length > 1 && fields[0].trim() !== "") {
        SetTextError({
          is_error: true,
          message:
            "Missing " + (5 - fields.length) + " fields in data " + (idx + 1),
        });
        isError = true;
      } else {
        if (fields.length > 4) {
          const sequence = parseInt(fields[0]?.trim());
          if (isNaN(sequence)) {
            SetTextError({
              is_error: true,
              message:
                "Sequence field in data " + (idx + 1) + " is not a number ",
            });
            isError = true;
          } else if (sequence < 0) {
            SetTextError({
              is_error: true,
              message:
                "Sequence field in data " + (idx + 1) + " must be positive",
            });
            isError = true;
          } else {
            tempData.push({
              sequence: sequence,
              name: fields[1].trim(),
              username: fields[2].trim(),
              password: fields[3].trim(),
              class_room: fields[4].trim(),
            });
          }
        }
      }
    });

    if (!isError) {
      dispatch(AddMultiStudent(tempData));
      SetTextData("");
    }
  }

  return (
    <div className="mt-4">
      <div className="max-w-lg">
        <label htmlFor="sequense" className="mb-2 block font-medium">
          Import Plain Text (XLX SCHEMA)
        </label>
        <textarea
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          aria-autocomplete="none"
          className="block min-h-32 w-full rounded-lg border-gray-400 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 md:text-base"
          rows={3}
          placeholder="Paste Data"
          value={valueTextData}
          onChange={(e) => handleChangeText(e.currentTarget.value)}
        ></textarea>
        {textError.is_error && (
          <p className="mt-1 text-sm text-red-600">{textError.message}</p>
        )}
      </div>
      <div className="mt-3">
        <button
          onClick={() => handleImport()}
          className="rounded-lg bg-black px-4 py-2 text-base text-white"
        >
          Import
        </button>
      </div>
    </div>
  );
}
