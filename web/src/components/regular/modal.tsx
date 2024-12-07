import { CloseModal } from "@/lib/features/exam/examSlice";
import { useAppSelector } from "@/lib/hooks";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { LoadingSpiner } from "./Loading";
const QuestionList = lazy(() => import("./panel-question/question-list"));

export default function ModalInfo({
  CollectQuestion,
}: {
  CollectQuestion: () => void;
}) {
  const [confirm, SetConfirm] = useState(false);

  const info = useAppSelector((state) => state.exam);
  const dataModal = useAppSelector((state) => state.exam.dataModal);
  const autoCloseDuration = useAppSelector(
    (state) => state.question.count_down_exit,
  );
  const [countDown, SetCountDown] = useState(5);
  const dispatch = useDispatch();

  useEffect(() => {
    if (info.stateSend === "success") {
      dispatch(CloseModal());
    }
  }, [info.stateSend, dispatch]);

  useEffect(() => {
    if (dataModal.modalOpen === false) {
      dispatch(CloseModal());
      SetConfirm(false);
    }
  }, [dataModal.modalOpen, dispatch]);

  function handleClose() {
    if (info.stateSend === "success") {
      dispatch(CloseModal());
      return;
    }

    if (dataModal.typeModal === "panel-question") {
      dispatch(CloseModal());
      return;
    }

    if (dataModal.typeModal === "collect" && dataModal.modalOpen) {
      dispatch(CloseModal());
      return;
    }
  }

  useEffect(() => {
    if (dataModal.typeModal === "close-windows") {
      SetCountDown(autoCloseDuration);

      const interval = setInterval(
        () => SetCountDown((prev) => (prev > 0 ? prev - 1 : 0)),
        1000,
      );
      return () => clearInterval(interval);
    }
  }, [dataModal.typeModal, autoCloseDuration]);

  useEffect(() => {
    if (countDown < 1) {
      console.log("socket auto-close");

      // socket.emit("auto-close", { username: "jalu nugroho" });
      window.location.replace("/");
    }
  }, [countDown]);

  function BackToQuestion() {
    dispatch(CloseModal());
    console.log("socket joint-window");
    // socket.emit("joint-window", { username: "jalu nugroho" });
  }

  return (
    <Dialog
      open={dataModal.modalOpen}
      onClose={() => handleClose()}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-20 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="data-[closed]:transform-[scale(95%)] relative w-full max-w-md rounded-xl border bg-white px-2 py-2 pb-4 data-[closed]:opacity-0"
          >
            <div className="flex items-center justify-between px-5 pt-2">
              <DialogTitle
                as="h3"
                className="truncate whitespace-nowrap text-xl font-medium text-black"
              >
                {dataModal.modal_title}
              </DialogTitle>

              {dataModal.typeModal === "panel-question" && (
                <button
                  className="select-none rounded-full ring-0 ring-slate-300 transition active:bg-slate-300 active:ring-8"
                  onClick={() => dispatch(CloseModal())}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            {dataModal.typeModal === "panel-question" ? (
              <div className="px-5 pb-4 pt-2">
                <Suspense
                  fallback={
                    <div className="py-32">
                      <LoadingSpiner />
                    </div>
                  }
                >
                  <QuestionList />
                </Suspense>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => dispatch(CloseModal())}
                    className="flex items-center gap-x-2 rounded-md border border-gray-500 bg-gray-100 px-3 py-1.5 active:bg-gray-200 disabled:opacity-45 disabled:active:bg-gray-100"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-5 py-4">
                <p>{dataModal.message}</p>
                {info.stateSend === "error" && (
                  <p className="mt-2 text-red-600">
                    Gagal mengumpulkan jawaban, silahkan coba kembali!!
                  </p>
                )}

                {!(dataModal.typeModal === "close-windows") && (
                  <div className="mt-4 flex">
                    <input
                      onChange={(e) => SetConfirm(e.target.checked)}
                      disabled={info.stateSend === "loading"}
                      checked={confirm}
                      type="checkbox"
                      className="mt-0.5 size-5 shrink-0 rounded border-gray-400 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                      id="hs-default-checkbox"
                    />
                    <label
                      htmlFor="hs-default-checkbox"
                      className="black ms-3 select-none"
                    >
                      Saya Mengerti
                    </label>
                  </div>
                )}
                {dataModal.typeModal === "close-windows" && (
                  <div>
                    Anda akan keluar dalam
                    <span className="font-bold text-red-500">
                      {" " + countDown + " "}detik
                    </span>
                  </div>
                )}
                <div className="mt-5 flex justify-end">
                  {dataModal.typeModal === "close-windows" ? (
                    <button
                      onClick={() => BackToQuestion()}
                      disabled={info.stateSend === "loading"}
                      className="flex items-center gap-x-2 rounded-md border border-red-500 bg-red-100 px-3 py-1.5 active:bg-red-200 disabled:opacity-45 disabled:active:bg-red-100"
                    >
                      Kembali
                    </button>
                  ) : (
                    <button
                      onClick={() => CollectQuestion()}
                      disabled={!(confirm && !(info.stateSend == "loading"))}
                      className="flex items-center gap-x-2 rounded-md border border-indigo-500 bg-indigo-100 px-3 py-1.5 active:bg-indigo-200 disabled:opacity-45 disabled:active:bg-indigo-100"
                    >
                      Kumpulkan
                    </button>
                  )}
                </div>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
