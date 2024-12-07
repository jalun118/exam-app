import { GetPackageQuestionById, RandomCourse } from "@/dummy-data";
import { notFound } from "next/navigation";
import DetailView from "./detail-view";

export default function DetailQuestionPage({
  params,
}: {
  params: { id: string };
}) {
  const dataPackageQuestion = GetPackageQuestionById(params.id);

  if (!dataPackageQuestion) return notFound();

  return (
    <div>
      <header className="mb-7 dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Detail Questions
        </h1>
        <div className="mt-4">
          <span className="mr-1 inline-flex items-center gap-x-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-800 dark:bg-blue-800/30 dark:text-blue-500">
            {new Date(dataPackageQuestion.created_at).toDateString()}
          </span>
          <span className="mr-1 inline-flex items-center gap-x-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-800 dark:bg-white/10 dark:text-white">
            {dataPackageQuestion.number_question + " Question"}
          </span>
          <span className="inline-flex items-center gap-x-1.5 rounded-full bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
            {RandomCourse().toUpperCase()}
          </span>
        </div>
      </header>
      <DetailView data={dataPackageQuestion} />
    </div>
  );
}
