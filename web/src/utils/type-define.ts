export interface iSchedule {
  id: string;
  name: string;
  date_start: string;
  date_end: string;
  duration: number;
  room: string;
}

export type tAnswerOption = {
  index_option: number;
  option: string;
};

export type tQuestion = {
  question: string;
  index_question: number;
  answer_options: tAnswerOption[];
};

export type ExamData = {
  exam_title: string;
  count_down_exit: number;
  duration_exam: number;
  exam_subject: string;
  quetions: tQuestion[];
  exam_id: string;
  start_test: string;
};

export interface iPackageQuestion {
  id: string;
  title: string;
  author: string;
  number_question: number;
  created_at: string;
}
