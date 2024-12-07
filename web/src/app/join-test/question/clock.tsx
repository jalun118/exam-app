import { SetTimer } from "@/lib/features/timer/timerSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useCallback, useEffect } from "react";
import { deltaTimeSecond } from "../../../utils/utils";
import { TimeOutExam } from "@/lib/features/exam/examSlice";

export default function ClockSidebar() {
  const timer = useAppSelector((state) => state.timer);
  const examFinish = useAppSelector((state) => state.exam.isFinish);
  const duration_test = useAppSelector(
    (state) => state.question.duration_question,
  );
  const start_test = useAppSelector((state) => state.question.start_test);
  const dispatch = useAppDispatch();

  const durationTest = useCallback(() => {
    const deltaDuration =
      duration_test * 60 - deltaTimeSecond(start_test, new Date()); // detik

    if (Number.isNaN(deltaDuration)) {
      window.location.replace("/");
      return;
    }

    const hour = Math.trunc(deltaDuration / 3600);
    const minute = Math.trunc((deltaDuration % 3600) / 60);
    const second = Math.trunc((deltaDuration % 3600) % 60);

    if (hour < 0 || minute < 0 || second < 0) {
      console.log("socket time-out");

      // socket.emit("timeout-exam", { username: "jalu nugroho" });
      dispatch(TimeOutExam());
      return;
    }

    const timer = [
      hour < 10 ? "0" + hour : hour.toString(),
      minute < 10 ? "0" + minute : minute.toString(),
      second < 10 ? "0" + second : second.toString(),
    ].join(":");
    const progressPersent = 100 - (deltaDuration / 60 / duration_test) * 100;
    dispatch(SetTimer({ progress: progressPersent, timer: timer }));
  }, [dispatch, duration_test, start_test]);

  useEffect(() => {
    if (!examFinish) {
      const intr = setInterval(() => durationTest(), 1000);
      return () => clearInterval(intr);
    }
  }, [examFinish, durationTest]);

  return (
    <svg className="h-full w-full" viewBox="0 0 100 100">
      <circle
        className="stroke-current text-gray-200"
        strokeWidth={4}
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
      ></circle>
      <circle
        className="origin-center -rotate-90 stroke-current text-blue-400 transition-all duration-500"
        strokeWidth={4}
        strokeLinecap="round"
        cx="50"
        cy="50"
        r="40"
        fill="transparent"
        strokeDasharray="251.2"
        style={{
          strokeDashoffset: 251.2 - (251.2 * (100 - timer.progress)) / 100,
        }}
      ></circle>
      <text
        x="50"
        y="40"
        fontSize="8"
        textAnchor="middle"
        alignmentBaseline="middle"
        className="select-none fill-gray-400 font-medium"
      >
        Sisa Waktu
      </text>
      <text
        x="50"
        y="54"
        fontSize="15"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontVariant="tabular-nums"
        className="select-none fill-blue-500 font-medium"
      >
        {timer.timer}
      </text>
    </svg>
  );
}
