import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface examSlice {
  isFinish: boolean;
  onCloseRun: boolean;
  dataModal: {
    typeModal:
      | "no"
      | "timeout"
      | "collect"
      | "close-windows"
      | "panel-question";
    modalOpen: boolean;
    message: string;
    modal_title: string;
  };
  stateSend: "idle" | "loading" | "success" | "error";
}

const initialState: examSlice = {
  isFinish: false,
  stateSend: "idle",
  onCloseRun: true,
  dataModal: {
    message: "",
    modal_title: "",
    modalOpen: false,
    typeModal: "no",
  },
};

export const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    TimeOutExam: (state) => {
      state.isFinish = true;
      state.onCloseRun = false;
      state.dataModal.message =
        "Waktu mengerjakan sudah habis, silahkan kumpulkan jawaban";
      state.dataModal.modal_title = "Waktu Habis";
      state.dataModal.modalOpen = true;
      state.dataModal.typeModal = "timeout";
    },
    SetNoFinishExam: (state) => {
      state.isFinish = false;
      state.onCloseRun = true;
    },
    CollectAnswers: (state) => {
      state.onCloseRun = true;
      state.dataModal.message =
        "Jika anda kumpulkan maka anda tidak bisa kembali untuk mengerjakan soal ini";
      state.dataModal.modal_title = "Kumpulkan Jawaban";
      state.dataModal.modalOpen = true;
      state.dataModal.typeModal = "collect";
    },
    OnChangeWindow: (state) => {
      if (
        state.stateSend !== "loading" &&
        state.dataModal.typeModal !== "timeout"
      ) {
        state.onCloseRun = true;
        state.dataModal.message =
          "Anda terdeteksi keluar dari aplikasi, silahkan kembali kedalam aplikasi atau keluar secara otomotis.";
        state.dataModal.modal_title = "Terdeteksi keluar";
        state.dataModal.modalOpen = true;
        state.dataModal.typeModal = "close-windows";
      }
    },
    CloseModal: (state) => {
      if (state.stateSend !== "loading") {
        state.onCloseRun = true;
        state.dataModal.modalOpen = false;
        state.dataModal.typeModal = "no";
        state.dataModal.message = "";
      }
    },
    OpenModal: (state) => {
      state.dataModal.modalOpen = true;
    },
    SetStateSendAnswer: (
      state,
      actions: PayloadAction<"idle" | "loading" | "success" | "error">,
    ) => {
      state.stateSend = actions.payload;
      switch (actions.payload) {
        case "idle":
          state.onCloseRun = true;
          break;
        case "error":
          state.onCloseRun = true;
          break;
        case "loading":
          state.onCloseRun = false;
          break;
        case "success":
          state.onCloseRun = false;
          break;
        default:
          state.onCloseRun = true;
          break;
      }
    },
    SetOpenPanelQuestion: (state) => {
      state.isFinish = false;
      state.onCloseRun = true;
      state.dataModal.message = "";
      state.dataModal.modal_title = "Panel Question";
      state.dataModal.modalOpen = true;
      state.dataModal.typeModal = "panel-question";
    },
  },
});

export const {
  TimeOutExam,
  SetNoFinishExam,
  CollectAnswers,
  SetStateSendAnswer,
  CloseModal,
  OnChangeWindow,
  OpenModal,
  SetOpenPanelQuestion,
} = examSlice.actions;

export default examSlice.reducer;
