import { iStudentWithScore } from "@/dummy-data";
import { PrefixDashboard } from "@/lib/features/dashboard/prefix-instance-dashboard";
import Link from "next/link";

function GetColorByScore(score: number) {
  if (score >= 80) {
    return (
      <div className="text-lg font-semibold tabular-nums text-teal-500 md:text-2xl">
        {score}
      </div>
    );
  }
  if (score >= 70) {
    return (
      <div className="text-lg font-semibold tabular-nums text-yellow-500 md:text-2xl">
        {score}
      </div>
    );
  }
  return (
    <div className="text-lg font-semibold tabular-nums text-red-500 md:text-2xl">
      {score}
    </div>
  );
}
export default function CardStudent({
  data,
  index,
}: {
  data: iStudentWithScore;
  index: number;
}) {
  return (
    <div
      key={data.id}
      className="flex items-center justify-between rounded-xl border border-gray-400 px-3 py-4"
    >
      <div className="flex text-sm md:text-lg">
        <span className="mr-2 font-semibold">{index + 1}.</span>
        <div className="flex flex-col">
          <Link
            href={PrefixDashboard(
              "/student/" + data.student_id + "/" + data.id,
            )}
          >
            <h3 className="max-w-32 truncate whitespace-nowrap text-black hover:text-gray-500 md:max-w-48">
              {data.student_name}
            </h3>
          </Link>
          <p className="text-sm font-semibold text-gray-500">10 E 1</p>
        </div>
      </div>
      {GetColorByScore(data.score)}
    </div>
  );
}
