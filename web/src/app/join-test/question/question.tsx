import { useAppSelector } from "@/lib/hooks";
import { lazy, Suspense } from "react";
import { LoadingSpiner } from "../../../components/regular/Loading";

const QuestionOption = lazy(() => import("./question-option"));
const QuestionView = lazy(() => import("./question-view"));

export default function Question() {
  const indexQuestion = useAppSelector(
    (state) => state.question.question_index,
  );
  const question = useAppSelector((state) =>
    state.question.list_question.find(
      (v) => v.index_question === indexQuestion,
    ),
  );

  return (
    <div className="mx-3 px-0 pb-10 pt-6 md:mx-8 lg:border lg:border-gray-500 lg:px-10 lg:pt-8">
      <Suspense
        fallback={
          <div className="py-20">
            <LoadingSpiner />
          </div>
        }
      >
        <div className="mx-2 flex w-full lg:mx-0 lg:text-lg">
          <span className="mr-2 hidden tabular-nums lg:inline-block">
            {indexQuestion + 1}.
          </span>
          <QuestionView question={question?.question} />
        </div>
        <QuestionOption
          answerOptions={question?.answer_options ?? []}
          indexQuestionData={question?.index_question ?? 0}
          tabQuestion={indexQuestion}
        />
      </Suspense>
    </div>
  );
}
