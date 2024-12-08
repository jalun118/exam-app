import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type tModal = "delete" | "move-student" | "delete-many";

type tModalStudentInfo = {
  student_name: string;
  class: string;
  id: string;
};

interface iStudentSlice {
  student_select: string[];
  modal_student: {
    is_open: boolean;
    type_modal: tModal;
    student_info: tModalStudentInfo | null;
  };
}

const initialState: iStudentSlice = {
  student_select: [],
  modal_student: {
    is_open: false,
    type_modal: "delete",
    student_info: null,
  },
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
  },
});

export const {
  AddSelectStudent,
  DeleteSelectStudent,
  ToggleSelectStudent,
  CloseModalStudent,
  SetOpenModalStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
