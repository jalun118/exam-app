import { SetOpenPanelQuestion } from "@/lib/features/exam/examSlice";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";

export default function HeaderQuestion() {
  const indexQuestion = useAppSelector(
    (state) => state.question.question_index,
  );
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useDispatch();
  return (
    <div className="block border-y border-gray-400 lg:hidden">
      <div className="container flex items-center justify-between py-2">
        <div className="flex items-center gap-x-3">
          <button
            onClick={() => dispatch(SetOpenPanelQuestion())}
            className="flex items-center justify-center rounded-md border border-blue-400 bg-blue-100 p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span className="sr-only">Modal Questions</span>
          </button>
          <span className="select-none text-base font-semibold tabular-nums sm:text-xl">
            Soal {indexQuestion + 1}
          </span>
        </div>
        {username.length > 0 && (
          <span className="select-none text-right text-base font-medium capitalize sm:text-lg">
            Hai, {username}
          </span>
        )}
      </div>
    </div>
  );
}
