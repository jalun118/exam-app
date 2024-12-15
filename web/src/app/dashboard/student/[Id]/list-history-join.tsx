"use client";
import PaginationTable from "@/components/admin/pagination-table";
import { ListHistoryJointTest } from "@/dummy-data";
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

function TimeFormat(date: string): string {
  const cur = new Date(date);
  const currentDate = [
    cur.getDate() > 9 ? cur.getDate().toString() : "0" + cur.getDate(),
    cur.getMonth() + 1 > 9
      ? (cur.getMonth() + 1).toString()
      : "0" + (cur.getMonth() + 1),
    cur.getFullYear(),
  ];
  const currentHour = [
    cur.getHours() > 9 ? cur.getHours().toString() : "0" + cur.getHours(),
    cur.getMinutes() > 9 ? cur.getMinutes().toString() : "0" + cur.getMinutes(),
  ];
  return currentDate.join("-") + " " + currentHour.join(":");
}

export default function ListHistoryJoin({
  studentId: student_id,
}: {
  studentId: string;
}) {
  return (
    <div>
      <div className="mb-8 mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ListHistoryJointTest.slice(0, 5).map((exam) => (
          <div key={exam.id}>
            <div className="flex items-center justify-between rounded-lg border border-gray-400 px-4 py-3">
              <div className="w-full overflow-hidden">
                <Link
                  href={PrefixDashboard(
                    "/student/" + student_id + "/" + exam.id,
                  )}
                  className="hyphens-auto break-words text-base font-semibold hover:text-gray-600"
                >
                  <h3>{exam.title}</h3>
                </Link>
                <p className="text-sm text-gray-500">
                  {TimeFormat(exam.created_at)}
                </p>
              </div>
              <div className="text-2xl">{GetColorByScore(exam.score)}</div>
            </div>
          </div>
        ))}
      </div>
      <PaginationTable
        metaData={{ end_data: 10, start_data: 0, total_data: 1000 }}
        paginationEvent={(e) => console.log(e)}
      />
    </div>
  );
}
