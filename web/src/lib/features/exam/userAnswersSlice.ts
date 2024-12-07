import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface answers {
  index_in_panel: number;
  index_question: number;
  index_answers?: number;
  type_answers: "answered" | "unanswered";
}

interface userAnswersSlice {
  exam_id: string;
  answers: answers[];
}

const initialState: userAnswersSlice = {
  exam_id: "",
  answers: [],
};

export const userAnswersSlice = createSlice({
  name: "user_answers",
  initialState,
  reducers: {
    SetIdExam: (state, actions: PayloadAction<string>) => {
      state.exam_id = actions.payload;
    },
    SetAnswer: (state, actions: PayloadAction<answers>) => {
      const findAnswer = state.answers.findIndex(
        (v) => v.index_question === actions.payload.index_question,
      );

      if (findAnswer === -1) {
        state.answers = [
          ...state.answers.slice(0, actions.payload.index_in_panel),
          {
            index_answers: actions.payload.index_answers,
            index_question: actions.payload.index_question,
            index_in_panel: actions.payload.index_in_panel,
            type_answers: "answered",
          },
          ...state.answers.slice(actions.payload.index_in_panel),
        ];
      }

      if (findAnswer !== -1) {
        state.answers[findAnswer].index_answers = actions.payload.index_answers;
      }
    },
  },
});

export const { SetAnswer, SetIdExam } = userAnswersSlice.actions;

export default userAnswersSlice.reducer;
