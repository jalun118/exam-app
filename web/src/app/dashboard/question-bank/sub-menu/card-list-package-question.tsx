import { iPackageQuestion, RandomCourse } from "@/dummy-data";
import { PrefixDashboard } from "@/lib/features/dashboard/prefix-instance-dashboard";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CardListPackage({ data }: { data: iPackageQuestion }) {
  const [course, setCourse] = useState("NO");

  useEffect(() => {
    setCourse(RandomCourse().toUpperCase());
  }, []);

  return (
    <div className="flex flex-col rounded-xl border border-gray-400 bg-white shadow-sm">
      <div className="relative p-4 md:p-5">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <span className="mr-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
              {new Date(data.created_at).toDateString()}
            </span>
            <span className="mr-1 inline-flex items-center gap-x-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
              {data.number_question + " Question"}
            </span>
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
              {course}
            </span>
          </div>

          <Menu
            as="div"
            className="absolute right-3 top-3 inline-block text-left"
          >
            <div>
              <MenuButton className="flex aspect-square items-center justify-center rounded-full bg-white p-1 ring-0 ring-gray-100 transition duration-75 ease-in-out active:bg-gray-100 active:ring-4">
                <svg
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
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    href={PrefixDashboard("/question-bank/" + data.id)}
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Detail
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    href={
                      "/dashboard/schedule/new?question=" +
                      data.id +
                      "&expired=" +
                      Buffer.from(new Date().toJSON()).toString("base64") +
                      "&action=use"
                    }
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Use Questions
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        <h3 className="text-base font-bold text-gray-800 sm:text-lg">
          {data.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">{data.author}</p>
      </div>
    </div>
  );
}
