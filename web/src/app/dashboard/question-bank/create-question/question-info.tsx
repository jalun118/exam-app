import InputText from "@/components/admin/InputText";

export default function QuestionInfo() {
  return (
    <div className="max-w-xl">
      <div className="flex flex-col rounded-xl border border-gray-400 bg-white shadow-sm">
        <div className="p-4 md:p-5">
          <div className="relative break-words">
            <InputText
              title="title for question"
              valueEmpty="Untitled Question"
              className="m-0 block h-[calc(1.75rem+0.5rem+2px)] w-full resize-none whitespace-normal text-wrap border-b-2 border-x-transparent border-b-gray-400 border-t-transparent bg-transparent p-0 pb-2 text-lg font-bold text-gray-800 outline-none focus:border-blue-500 focus:border-x-transparent focus:border-b-blue-500 focus:border-t-transparent focus:ring-0 disabled:pointer-events-none disabled:opacity-50 dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:border-b-neutral-600 dark:focus:ring-neutral-600"
            ></InputText>
          </div>
          <div className="mt-3 flex items-center gap-x-3 text-gray-500">
            <span>Question Private</span>
            <label className="flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer relative h-5 w-9 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700 rtl:peer-checked:after:-translate-x-full"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
