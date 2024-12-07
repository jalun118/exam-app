"use client";

import ListQuestion from "./list-question";
import QuestionInfo from "./question-info";
import SidebarPanel from "./sidebar-panel";

export default function FormCreateExam() {
  return (
    <div>
      <header className="mb-7 flex items-center justify-between dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Create Question
        </h1>

        <div>
          <button className="rounded-md bg-teal-500 px-4 py-2 font-semibold text-white outline-none active:bg-teal-600">
            Save
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-6 pb-20 md:grid md:grid-cols-12">
        <div className="max-w-2xl md:col-span-7">
          <QuestionInfo />

          <div className="mb-4 mt-4 md:hidden">
            <SidebarPanel />
          </div>

          <ListQuestion />
        </div>
        <div className="hidden w-full md:col-span-5 md:block">
          <SidebarPanel />
        </div>
      </div>
    </div>
  );
}
