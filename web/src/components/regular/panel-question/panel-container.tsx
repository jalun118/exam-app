import { lazy, Suspense } from "react";
import { LoadingSpiner } from "../Loading";

const QuestionList = lazy(() => import("./question-list"));

export default function PanelContainer() {
  return (
    <div>
      <h2 className="hidden text-center text-2xl font-semibold md:block">
        Panel Soal
      </h2>
      <Suspense
        fallback={
          <div className="py-32">
            <LoadingSpiner />
          </div>
        }
      >
        <QuestionList />
      </Suspense>
    </div>
  );
}
