import { ExamData, tQuestion } from "@/dummy-data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface questionSlice {
  question_index: number;
  duration_question: number;
  length_question: number;
  count_down_exit: number;
  list_question: tQuestion[];
  exam_title: string;
  start_test: string;
}

const initialState: questionSlice = {
  duration_question: 0,
  list_question: [],
  question_index: 0,
  length_question: 0,
  count_down_exit: 0,
  exam_title: "",
  start_test: "",
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    incrementIndex: (state) => {
      state.question_index += 1;
    },
    decrementIndex: (state) => {
      state.question_index -= 1;
    },
    SetIndexQuestion: (state, actions: PayloadAction<number>) => {
      state.question_index = actions.payload;
    },
    SetDataQuestion: (state, actions: PayloadAction<ExamData>) => {
      state.list_question = actions.payload.quetions ?? [];
      state.count_down_exit = actions.payload.count_down_exit ?? 0;
      state.length_question = actions.payload.quetions.length ?? 0;
      state.duration_question = actions.payload.duration_exam;
      state.exam_title = actions.payload.exam_title;
      state.start_test = actions.payload.start_test;
    },
  },
});

export const {
  decrementIndex,
  incrementIndex,
  SetDataQuestion,
  SetIndexQuestion,
} = questionSlice.actions;

export default questionSlice.reducer;
