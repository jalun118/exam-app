import QuestionView from "@/app/join-test/question/question-view";
import MarkdownView from "@/components/regular/MarkdownView";
import { tQuestion } from "@/dummy-data";

const TEXT_ALFABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function GetTextAlfa(index: number): string {
  return TEXT_ALFABET.charAt(index);
}
export default function CardQuestionView({
  data_question,
  index_question,
  key_index,
}: {
  data_question: tQuestion;
  index_question: number;
  key_index: number | null;
}) {
  return (
    <div className="relative mt-2 flex w-full rounded-xl border border-gray-400 bg-white p-4 shadow-sm md:p-5 md:px-5">
      <div className="flex-shrink">
        <span className="mr-2 inline-block text-base md:text-lg">
          {index_question + 1}.
        </span>
      </div>
      <div>
        <div className="flex w-full">
          <div className="relative w-full break-words">
            <QuestionView question={data_question.question} />
          </div>
        </div>
        <div className="mt-3">
          {data_question.answer_options.map((data, index_op) => (
            <div className="mb-3 mt-1 flex w-full items-start" key={index_op}>
              <div className="mr-1 flex select-none items-center text-base">
                {key_index === index_op ? (
                  <span className="flex aspect-square w-6 items-center justify-center rounded-full bg-teal-500 text-white">
                    {GetTextAlfa(index_op)}.
                  </span>
                ) : (
                  <span className="flex aspect-square w-6 items-center justify-center">
                    {GetTextAlfa(index_op)}.
                  </span>
                )}
              </div>
              <div className="relative w-full break-words">
                <MarkdownView>{data.option}</MarkdownView>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
