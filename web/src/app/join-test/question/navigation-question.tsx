import { CollectAnswers } from "@/lib/features/exam/examSlice";
import {
  decrementIndex,
  incrementIndex,
} from "@/lib/features/exam/questionSlice";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";

export default function NavigationQuestion() {
  const dispatch = useDispatch();
  const indexQuestion = useAppSelector(
    (state) => state.question.question_index,
  );
  const lengthQuestion = useAppSelector(
    (state) => state.question.length_question,
  );
  const lengthAnswers = useAppSelector(
    (state) => state.user_answers.answers.length,
  );
  const openModal = useAppSelector((state) => state.exam.dataModal.modalOpen);

  return (
    <div className="mx-3 flex justify-between md:mx-8 md:mt-8">
      <button
        onClick={() => dispatch(decrementIndex())}
        disabled={indexQuestion < 1 || openModal}
        className="flex items-center gap-x-2 border border-red-500 bg-red-100 px-3 py-1.5 active:bg-red-200 disabled:opacity-45 disabled:active:bg-red-100"
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
        <span className="hidden md:inline-block">Sebelum</span>
      </button>
      {indexQuestion < lengthQuestion - 1 && !openModal ? (
        <button
          onClick={() => dispatch(incrementIndex())}
          className="flex items-center gap-x-2 border border-emerald-500 bg-emerald-100 px-3 py-1.5 active:bg-emerald-200 disabled:opacity-45 disabled:active:bg-emerald-100"
        >
          <span className="hidden md:inline-block">Berikutnya</span>
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
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      ) : (
        <button
          disabled={lengthAnswers !== lengthQuestion}
          onClick={() => dispatch(CollectAnswers())}
          className="flex items-center gap-x-2 border border-indigo-500 bg-indigo-100 px-3 py-1.5 active:bg-indigo-200 disabled:opacity-45 disabled:active:bg-indigo-100"
        >
          Kumpulkan
        </button>
      )}
    </div>
  );
}
