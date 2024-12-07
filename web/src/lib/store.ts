import { configureStore } from "@reduxjs/toolkit";
import createQuestionSlice from "./features/dashboard/createQuetionSlice";
import examSlice from "./features/exam/examSlice";
import questionSlice from "./features/exam/questionSlice";
import userAnswersSlice from "./features/exam/userAnswersSlice";
import timerSlice from "./features/timer/timerSlice";
import userSlice from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      timer: timerSlice,
      exam: examSlice,
      question: questionSlice,
      user_answers: userAnswersSlice,
      create_question: createQuestionSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
