import ChartScore from "./chart-score";
import ListHistoryJoin from "./list-history-join";

export default function DetailStudent({ params }: { params: { Id: string } }) {
  return (
    <div className="pb-20">
      <header className="mb-4 dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Detail Students
        </h1>
      </header>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="col-span-6">
            <div className="divide-y divide-gray-400 rounded-xl border border-gray-400 px-5 py-2">
              <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900 md:text-base">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
                  Sumbul
                </dd>
              </div>
              <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900 md:text-base">
                  Username
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
                  XXX_TZY
                </dd>
              </div>
              <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900 md:text-base">
                  Password
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
                  XXX_TZY
                </dd>
              </div>
              <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900 md:text-base">
                  Class
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
                  11 FA
                </dd>
              </div>
              <div className="px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium text-gray-900 md:text-base">
                  Room
                </dt>
                <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 md:text-base">
                  Experiment
                </dd>
              </div>
            </div>
          </div>
          <ChartScore />
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">History joint Test</h2>
          <ListHistoryJoin studentId={params.Id} />
        </div>
      </div>
    </div>
  );
}
