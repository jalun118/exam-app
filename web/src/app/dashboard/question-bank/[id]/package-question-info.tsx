import { iPackageQuestion, RandomCourse } from "@/dummy-data";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PackageQuestionInfo({
  data,
}: {
  data: iPackageQuestion;
}) {
  const [Course, SetCourse] = useState("NO COURSE");

  useEffect(() => {
    SetCourse(RandomCourse().toUpperCase());
  }, []);
  return (
    <div className="max-w-xl">
      <div className="flex flex-col rounded-xl border border-gray-400 bg-white p-4 shadow-sm md:p-5">
        <h3 className="text-xl font-bold">{data.title}</h3>
        <div className="flex items-center justify-between">
          <div className="relative mt-4 flex items-center gap-x-4">
            {data ? (
              <img
                alt=""
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-12 rounded-full bg-gray-50"
              />
            ) : (
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
            )}
            <div className="text-base">
              <p className="font-semibold text-gray-900">
                <a href="#">
                  <span className="absolute inset-0" />
                  {data.author}
                </a>
              </p>
              <p className="text-gray-600">{Course}</p>
            </div>
          </div>
          <div className="mt-3 flex items-center">
            <Link
              href={
                "/dashboard/schedule/new?question=" +
                data.id +
                "&expired=" +
                Buffer.from(new Date().toJSON()).toString("base64") +
                "&action=use"
              }
              className="flex rounded-lg bg-blue-600 px-4 py-1.5 font-semibold text-white"
            >
              Use Package
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
