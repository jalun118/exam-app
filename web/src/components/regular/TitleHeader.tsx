"use client";
import { useAppSelector } from "@/lib/hooks";

export default function TitleHeader() {
  const examTitle = useAppSelector((state) => state.question.exam_title);

  if (examTitle === "" || examTitle.length < 3) return null;

  return (
    <div className="hidden shrink-0 items-center md:inline-flex">
      <span className="text-xl font-semibold">{examTitle}</span>
    </div>
  );
}
