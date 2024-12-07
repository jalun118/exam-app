import { SetIndexQuestion } from "@/lib/features/exam/questionSlice";
import { useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDataByIndex } from "../../../utils/getDataByIndex";

export default function QuestionList() {
  const currentIndex = useAppSelector((state) => state.question.question_index);
  const answers = useAppSelector((state) => state.user_answers.answers);
  const dispatch = useDispatch();
  const length_question = useAppSelector(
    (state) => state.question.length_question,
  );

  const [indexPage, SetIndex] = useState<number | null>(null);
  const dataPage = getDataByIndex(currentIndex, 15, length_question, indexPage);

  useEffect(() => {
    SetIndex(null);
  }, [currentIndex]);

  return (
    <>
      <div className="mb-8 mt-5 grid w-full grid-cols-5 gap-4">
        {dataPage.array.map((v) => {
          const posIndex = answers.findIndex((obj) => obj.index_in_panel === v);

          if (currentIndex === v) {
            return (
              <button
                key={v}
                className="size-11 rounded-full bg-blue-500 text-xl tabular-nums text-white"
              >
                {v + 1}
              </button>
            );
          }

          if (posIndex !== -1) {
            if (answers[posIndex].type_answers === "answered") {
              return (
                <button
                  key={v}
                  onClick={() => dispatch(SetIndexQuestion(v))}
                  className="size-11 rounded-full bg-teal-500 text-xl tabular-nums text-white"
                >
                  {v + 1}
                </button>
              );
            }
          }
          return (
            <button
              key={v}
              onClick={() => dispatch(SetIndexQuestion(v))}
              className="size-11 rounded-full border border-gray-500 bg-white text-xl tabular-nums text-gray-500"
            >
              {v + 1}
            </button>
          );
        })}
      </div>
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => SetIndex((prev) => (prev ?? dataPage.pos_index) - 1)}
          disabled={(indexPage ?? dataPage.pos_index) < dataPage.totalPage - 1}
          className="flex items-center gap-x-1 border border-sky-500 bg-sky-100 px-2 py-1.5 active:bg-sky-200 disabled:opacity-45 disabled:active:bg-sky-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          <span className="inline-block">Sebelum</span>
        </button>
        <button
          disabled={(indexPage ?? dataPage.pos_index) > dataPage.totalPage - 2}
          onClick={() => SetIndex((prev) => (prev ?? dataPage.pos_index) + 1)}
          className="flex items-center gap-x-1 border border-emerald-500 bg-emerald-100 px-2 py-1.5 active:bg-emerald-200 disabled:opacity-45 disabled:active:bg-emerald-100"
        >
          <span className="inline-block">Berikutnya</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
      <div>
        <div className="mt-6 flex flex-col gap-y-4 md:mb-5 md:mt-4">
          <div className="flex items-center gap-x-3">
            <div className="size-8 rounded-full border border-gray-500 bg-white"></div>
            <span className="select-none text-lg">Belum Selesai</span>
          </div>
          <div className="flex items-center gap-x-3">
            <div className="size-8 rounded-full border bg-teal-400"></div>
            <span className="select-none text-lg">Selesai</span>
          </div>
        </div>
      </div>
    </>
  );
}
