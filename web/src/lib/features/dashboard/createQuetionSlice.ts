import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export function GenerateString(length: number): string {
  if (typeof length !== "number") {
    throw Error("length is not number");
  }

  if (length > 100000) {
    return "kepanjangan";
  }

  const lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
  const upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numeric = "0123456789";

  const data = lowerAlphabet + upperAlphabet + numeric;

  let generator = "";

  for (let index = 0; index < length; index++) {
    generator += data[~~(Math.random() * data.length)];
  }
  return generator;
}

interface iOption {
  option: string;
  id: string;
}

export interface iQuestion {
  question: string;
  options: iOption[];
  id: string;
}

interface createQuestionSlice {
  questions: iQuestion[];
}

function createEmpityQuestion(id: string, option_id: string): iQuestion {
  return {
    options: [
      {
        option: "",
        id: option_id,
      },
    ],
    question: "",
    id: id,
  };
}

const initialState: createQuestionSlice = {
  questions: [createEmpityQuestion("dBZdjO5TBs", "ccyPEHmWHb")],
};

export const createQuestionSlice = createSlice({
  name: "createQuestionSlice",
  initialState,
  reducers: {
    UNSAFE_SetStateCreateQuestion: (
      state,
      actions: PayloadAction<iQuestion[]>,
    ) => {
      state.questions = actions.payload;
    },
    UNSAFE_SetStateCreateQuestionOption: (
      state,
      actions: PayloadAction<{ question_pos: number; options: iOption[] }>,
    ) => {
      state.questions[actions.payload.question_pos].options =
        actions.payload.options;
    },
    AddNewQuestion: (state) => {
      state.questions.push(
        createEmpityQuestion(GenerateString(10), GenerateString(10)),
      );
    },
    AddNewOption: (state, actions: PayloadAction<{ pos_question: number }>) => {
      state.questions[actions.payload.pos_question].options.push({
        id: GenerateString(10),
        option: "",
      });
    },
    EditQuestion: (
      state,
      actions: PayloadAction<{ pos_question: number; replace_value: string }>,
    ) => {
      state.questions[actions.payload.pos_question].question =
        actions.payload.replace_value;
    },
    EditOption: (
      state,
      actions: PayloadAction<{
        pos_question: number;
        pos_option: number;
        replace_value: string;
      }>,
    ) => {
      state.questions[actions.payload.pos_question].options[
        actions.payload.pos_option
      ].option = actions.payload.replace_value;
    },
    DeleteQuestion: (
      state,
      actions: PayloadAction<{ pos_question: number }>,
    ) => {
      state.questions = state.questions.filter(
        (_, pos) => pos !== actions.payload.pos_question,
      );
    },
    DeleteOption: (
      state,
      actions: PayloadAction<{ pos_question: number; pos_option: number }>,
    ) => {
      state.questions[actions.payload.pos_question].options.splice(
        actions.payload.pos_option,
        1,
      );
    },
  },
});

export const {
  AddNewOption,
  UNSAFE_SetStateCreateQuestion,
  AddNewQuestion,
  DeleteOption,
  DeleteQuestion,
  EditOption,
  EditQuestion,
  UNSAFE_SetStateCreateQuestionOption,
} = createQuestionSlice.actions;

export default createQuestionSlice.reducer;
