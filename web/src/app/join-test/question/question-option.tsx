import { SetAnswer } from "@/lib/features/exam/userAnswersSlice";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import MarkdownView from "../../../components/regular/MarkdownView";
import { tAnswerOption } from "../../../dummy-data";

const alfabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function QuestionOption({
  answerOptions,
  tabQuestion,
  indexQuestionData,
}: {
  answerOptions: tAnswerOption[];
  tabQuestion: number;
  indexQuestionData: number;
}) {
  const dispatch = useDispatch();
  const answers = useAppSelector((state) =>
    state.user_answers.answers.find((v) => v.index_question === tabQuestion),
  );

  return (
    <div className="mt-4 flex flex-col gap-y-5 px-2 md:ml-3 md:p-0 lg:pr-10">
      {answerOptions.map((options, i) => {
        if (options.index_option === answers?.index_answers) {
          return (
            <div
              key={options.index_option}
              className="flex cursor-default select-none border border-sky-500 bg-sky-50 md:cursor-pointer"
            >
              <span className="border-r border-r-sky-500 bg-sky-100 px-4 py-2">
                {alfabet[i] ?? "AA"}
              </span>
              <div className="prose px-4 py-2">
                <MarkdownView>{options.option}</MarkdownView>
              </div>
            </div>
          );
        }
        return (
          <div
            key={options.index_option}
            onClick={() =>
              dispatch(
                SetAnswer({
                  index_answers: options.index_option,
                  index_question: tabQuestion,
                  type_answers: "answered",
                  index_in_panel: indexQuestionData,
                }),
              )
            }
            className="flex cursor-default select-none border border-gray-500 md:cursor-pointer"
          >
            <span className="border-r border-r-gray-500 bg-gray-100 px-4 py-2">
              {alfabet[i] ?? "AA"}
            </span>
            <div className="prose px-4 py-2">
              <MarkdownView>{options.option}</MarkdownView>
            </div>
          </div>
        );
      })}
    </div>
  );
}
