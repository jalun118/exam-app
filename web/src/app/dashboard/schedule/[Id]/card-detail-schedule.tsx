import { GetBadgeStatus } from "@/components/admin/badge-status";

export default function CardDescriptionSchedule() {
  return (
    <div className="col-span-6 divide-y divide-gray-400 rounded-xl border border-gray-400 px-5 py-2">
      <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900 md:text-base">Name</dt>
        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
          Ulangan Harian
        </dd>
      </div>
      <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900 md:text-base">Date</dt>
        <div className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
          <div className="grid grid-cols-7">
            <div className="col-span-3">10:00:00</div>
            <div className="col-span-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-gray-400"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div className="col-span-3">20:00:00</div>
          </div>
          <div className="mt-3 grid grid-cols-7">
            <div className="col-span-3">20, Jan 2024</div>
            <div className="col-span-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-gray-400"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
            <div className="col-span-3">20, Jan 2024</div>
          </div>
        </div>
      </div>
      <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900 md:text-base">
          Option
        </dt>
        <div className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
          <div className="grid grid-cols-7">
            <div className="col-span-3">Anti Cheat</div>
            <div className="col-span-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-6 text-green-500"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
          </div>
          <div className="mt-2 grid grid-cols-7">
            <div className="col-span-3">Randomize</div>
            <div className="col-span-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-6 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900 md:text-base">Room</dt>
        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
          Experimental
        </dd>
      </div>
      <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900 md:text-base">
          Giving Question
        </dt>
        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
          <span className="rounded-full bg-blue-200 px-3 py-1 font-semibold">
            Full
          </span>
        </dd>
      </div>
      <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900 md:text-base">
          Status
        </dt>
        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
          {GetBadgeStatus("ongoing")}
        </dd>
      </div>
    </div>
  );
}
