"use client";
import {
  AddSingleStudent,
  iStudent,
  ReplaceStudentByIndex,
} from "@/lib/features/dashboard/studentSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

const SingleInputSchema = yup.object().shape({
  sequence: yup
    .number()
    .typeError("Must be positive number")
    .integer("Must be round number")
    .min(0, "Must be positive number")
    .required("Required"),
  name: yup.string().required("Required"),
  username: yup.string().required("Required"),
  password: yup.string().required("Required"),
  class_room: yup.string().required("Required"),
});

interface editStudent {
  index: number;
  student: iStudent;
}

export default function FormSingleInput({
  getEditStudent,
  SetEmpty,
}: {
  getEditStudent: editStudent | null;
  SetEmpty: () => void;
}) {
  const dispacth = useAppDispatch();

  function handleForm(data: iStudent) {
    dispacth(AddSingleStudent(data));
  }

  const initValueForm = {
    sequence: 0,
    name: "",
    username: "",
    password: "",
    class_room: "",
  };

  const {
    errors,
    touched,
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setValues,
  } = useFormik({
    initialValues: initValueForm,
    validationSchema: SingleInputSchema,
    onSubmit: (val, actions) => {
      handleForm(val);
      actions.resetForm();
    },
  });

  useEffect(() => {
    if (getEditStudent !== null) {
      setValues({
        sequence: getEditStudent?.student?.sequence ?? 0,
        name: getEditStudent?.student?.name ?? "",
        username: getEditStudent?.student?.username ?? "",
        password: getEditStudent?.student?.password ?? "",
        class_room: getEditStudent?.student?.class_room ?? "",
      });
    }
  }, [getEditStudent, setValues]);

  function handleReset() {
    SetEmpty();
    resetForm();
  }

  function handleSaveChange() {
    dispacth(
      ReplaceStudentByIndex({
        index: getEditStudent?.index ?? 0,
        student: values,
      }),
    );

    SetEmpty();
  }

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        <div className="max-w-lg">
          <label htmlFor="sequence" className="mb-1 block font-medium">
            Sequence
          </label>
          <input
            type="number"
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            spellCheck={false}
            id="sequence"
            name="sequence"
            onChange={handleChange}
            className="block max-w-md rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="102"
            value={values.sequence}
          />
          {errors.sequence && touched.sequence && (
            <p className="mt-1 text-sm text-red-600">{errors.sequence}</p>
          )}
        </div>
        <div className="mt-2 max-w-lg">
          <label htmlFor="name" className="mb-1 block font-medium">
            Name Student
          </label>
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            spellCheck={false}
            id="name"
            name="name"
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="Jennie Vannesa"
            value={values.name}
          />
          {errors.name && touched.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
        <div className="mt-2 max-w-lg">
          <label htmlFor="username" className="mb-1 block font-medium">
            Username
          </label>
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            spellCheck={false}
            id="username"
            name="username"
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="jennie_v1739"
            value={values.username}
          />
          {errors.username && touched.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username}</p>
          )}
        </div>
        <div className="mt-2 max-w-lg">
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            spellCheck={false}
            id="password"
            name="password"
            onChange={handleChange}
            className="block w-full rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="#jennie!8260"
            value={values.password}
          />
          {errors.password && touched.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>
        <div className="mt-2 max-w-lg">
          <label htmlFor="class_room" className="mb-1 block font-medium">
            Class Room
          </label>
          <input
            type="text"
            autoComplete="off"
            autoCorrect="off"
            aria-autocomplete="none"
            spellCheck={false}
            id="class_room"
            name="class_room"
            onChange={handleChange}
            className="block max-w-md rounded-lg border-gray-400 px-3 py-2 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
            placeholder="11 FA"
            value={values.class_room}
          />
          {errors.class_room && touched.class_room && (
            <p className="mt-1 text-sm text-red-600">{errors.class_room}</p>
          )}
        </div>
        <div className="mt-3 flex gap-x-2">
          {getEditStudent ? (
            <button
              type="button"
              onClick={() => handleSaveChange()}
              className="rounded-lg bg-black px-4 py-2 text-base text-white"
            >
              Change
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-base text-white"
            >
              Import
            </button>
          )}
          <button
            type="button"
            onClick={() => handleReset()}
            className="rounded-lg bg-black px-4 py-2 text-base text-white"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
