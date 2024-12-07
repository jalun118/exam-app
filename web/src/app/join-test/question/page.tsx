"use client";
import { LoadingSpiner } from "@/components/regular/Loading";
import ModalInfo from "@/components/regular/modal";
import {
  OnChangeWindow,
  SetStateSendAnswer,
} from "@/lib/features/exam/examSlice";
import { useAppSelector } from "@/lib/hooks";
import { getRandomInt } from "@/utils/utils";
import { Suspense, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import HeaderQuestion from "./header-question";
import NavigationQuestion from "./navigation-question";
import Question from "./question";
import Sidebar from "./sidebar";
// const username = "jalu nugroho";

function getFUllScreenElement() {
  return document.fullscreenElement;
}

export default function QuestionPage() {
  const dispatch = useDispatch();
  const CloseDetectorRun = useAppSelector((state) => state.exam.onCloseRun);

  useEffect(() => {
    if (!getFUllScreenElement()) {
      // window.location.replace("/");
    }
  }, []);

  function UploadAnswer() {
    dispatch(SetStateSendAnswer("loading"));
    const tm = setTimeout(() => {
      const random = getRandomInt(0, 1);

      if (random === 1) {
        dispatch(SetStateSendAnswer("success"));
        console.log("socket finish-exam");

        // socket.emit("finish-exam", { username: username });
        window.location.replace("/?xxx=dada");
      } else {
        console.log("socket error submit");
        // socket.emit("error-submit", { username: username });
        dispatch(SetStateSendAnswer("error"));
      }
    }, 2000);
    return () => clearTimeout(tm);
  }

  const onBlurWindow = useCallback(() => {
    if (CloseDetectorRun) {
      dispatch(OnChangeWindow());
      console.log("socket close window");

      // socket.emit("close-window", { username: username });
    }
  }, [CloseDetectorRun, dispatch]);

  useEffect(() => {
    window.addEventListener("blur", onBlurWindow);
    return () => window.removeEventListener("blur", onBlurWindow);
  }, [onBlurWindow]);

  return (
    <div>
      <div className="lg:container lg:max-w-screen-xl">
        <div className="flex w-full gap-x-10 lg:mt-10">
          <div className="md:7/12 sm:6/12 w-full lg:w-8/12">
            <Suspense
              fallback={
                <div className="py-40">
                  <LoadingSpiner />
                </div>
              }
            >
              <HeaderQuestion />
              <Question />
              <NavigationQuestion />
            </Suspense>
          </div>
          <div className="hidden lg:block lg:w-4/12">
            <Sidebar />
          </div>
        </div>
      </div>
      <ModalInfo CollectQuestion={() => UploadAnswer()} />
    </div>
  );
}
