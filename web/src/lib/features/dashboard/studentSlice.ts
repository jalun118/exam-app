import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type tModal = "delete" | "move-student" | "delete-many";

type tModalStudentInfo = {
  student_name: string;
  class: string;
  id: string;
};

export interface iStudent {
  name: string;
  class_room: string;
  username: string;
  sequence: number;
  password: string;
}

interface iStudentSlice {
  student_select: string[];
  modal_student: {
    is_open: boolean;
    type_modal: tModal;
    student_info: tModalStudentInfo | null;
  };
  list_new_student: iStudent[];
}

const initialState: iStudentSlice = {
  student_select: [],
  modal_student: {
    is_open: false,
    type_modal: "delete",
    student_info: null,
  },
  list_new_student: [],
};

export const studentSlice = createSlice({
  name: "studentSlice",
  initialState,
  reducers: {
    AddSelectStudent: (state, action: PayloadAction<{ id: string }>) => {
      state.student_select.push(action.payload.id);
    },
    DeleteSelectStudent: (state, action: PayloadAction<{ id: string }>) => {
      const indexSelect = state.student_select.findIndex(
        (val) => val === action.payload.id,
      );
      if (indexSelect > -1) {
        state.student_select.splice(indexSelect, 1);
      }
    },
    ToggleSelectStudent: (state, action: PayloadAction<{ id: string }>) => {
      const indexSelect = state.student_select.findIndex(
        (val) => val === action.payload.id,
      );
      if (indexSelect > -1) {
        state.student_select.splice(indexSelect, 1);
      }
      if (indexSelect === -1) {
        state.student_select.push(action.payload.id);
      }
    },
    SetOpenModalStudent: (
      state,
      action: PayloadAction<{
        type_open: tModal;
        info_student: tModalStudentInfo | null;
      }>,
    ) => {
      state.modal_student.is_open = true;
      state.modal_student.type_modal = action.payload.type_open;

      if (
        action.payload.info_student &&
        action.payload.type_open === "delete"
      ) {
        state.modal_student.student_info = action.payload.info_student;
      }
    },
    CloseModalStudent: (state) => {
      state.modal_student.is_open = false;
      state.modal_student.type_modal = "delete";
      state.modal_student.student_info = null;
    },
    AddSingleStudent: (state, action: PayloadAction<iStudent>) => {
      state.list_new_student.push(action.payload);
    },
    AddMultiStudent: (state, action: PayloadAction<iStudent[]>) => {
      state.list_new_student = [...state.list_new_student, ...action.payload];
    },
    ReplaceStudentByIndex: (
      state,
      action: PayloadAction<{ index: number; student: iStudent }>,
    ) => {
      state.list_new_student[action.payload.index] = action.payload.student;
    },
    RemoveStudentByIndex: (state, action: PayloadAction<number>) => {
      state.list_new_student.splice(action.payload, 1);
    },
  },
});

export const {
  AddSelectStudent,
  DeleteSelectStudent,
  ToggleSelectStudent,
  CloseModalStudent,
  SetOpenModalStudent,
  AddMultiStudent,
  AddSingleStudent,
  RemoveStudentByIndex,
  ReplaceStudentByIndex,
} = studentSlice.actions;

export default studentSlice.reducer;
