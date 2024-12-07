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

export const examDataExample: ExamData = {
  exam_id: "UHRO4U1qVphZTot6EJ9I",
  exam_title: "Simple Exam",
  count_down_exit: 30,
  duration_exam: 240,
  exam_subject: "General Knowledge",
  start_test: "2024-11-14T12:35:00.376Z",
  quetions: [
    {
      index_question: 0,
      question: "What is the capital of Indonesia?",
      answer_options: [
        { index_option: 0, option: "Jakarta" },
        { index_option: 1, option: "Surabaya" },
        { index_option: 2, option: "Bandung" },
        { index_option: 3, option: "Medan" },
      ],
    },
    {
      index_question: 1,
      question: "Which planet is known as the Red Planet?",
      answer_options: [
        { index_option: 0, option: "Mars" },
        { index_option: 1, option: "Venus" },
        { index_option: 2, option: "Jupiter" },
        { index_option: 3, option: "Saturn" },
      ],
    },
    {
      index_question: 2,
      question: "Who painted the Mona Lisa?",
      answer_options: [
        { index_option: 0, option: "Leonardo da Vinci" },
        { index_option: 1, option: "Pablo Picasso" },
        { index_option: 2, option: "Vincent van Gogh" },
        { index_option: 3, option: "Michelangelo" },
      ],
    },
    {
      index_question: 3,
      question: "What is the largest ocean on Earth?",
      answer_options: [
        { index_option: 0, option: "Pacific Ocean" },
        { index_option: 1, option: "Atlantic Ocean" },
        { index_option: 2, option: "Indian Ocean" },
        { index_option: 3, option: "Arctic Ocean" },
      ],
    },
    {
      index_question: 4,
      question: "What is the chemical symbol for gold?",
      answer_options: [
        { index_option: 0, option: "$Au$" },
        { index_option: 1, option: "$Ag$" },
        { index_option: 2, option: "$Cu$" },
        { index_option: 3, option: "$Fe$" },
      ],
    },
    {
      index_question: 5,
      question: "Which country hosted the 2022 FIFA World Cup?",
      answer_options: [
        { index_option: 0, option: "Qatar" },
        { index_option: 1, option: "Russia" },
        { index_option: 2, option: "Brazil" },
        { index_option: 3, option: "Germany" },
      ],
    },
    {
      index_question: 6,
      question: "What is the largest mammal on Earth?",
      answer_options: [
        { index_option: 0, option: "Blue Whale" },
        { index_option: 1, option: "African Elephant" },
        { index_option: 2, option: "Giraffe" },
        { index_option: 3, option: "Polar Bear" },
      ],
    },
    {
      index_question: 7,
      question: 'Who wrote the play "Hamlet"?',
      answer_options: [
        { index_option: 0, option: "William Shakespeare" },
        { index_option: 1, option: "Jane Austen" },
        { index_option: 2, option: "Charles Dickens" },
        { index_option: 3, option: "Mark Twain" },
      ],
    },
    {
      index_question: 8,
      question: "What is the chemical formula for water?",
      answer_options: [
        { index_option: 0, option: "$H_{2}O$" },
        { index_option: 1, option: "$CO_{2}$" },
        { index_option: 2, option: "$NaCl$" },
        { index_option: 3, option: "$NH_{3}$" },
      ],
    },
    {
      index_question: 9,
      question:
        "Which country won the most gold medals at the 2024 Summer Olympics?",
      answer_options: [
        { index_option: 0, option: "United States" },
        { index_option: 1, option: "China" },
        { index_option: 2, option: "Great Britain" },
        { index_option: 3, option: "Japan" },
      ],
    },
    {
      index_question: 10,
      question:
        "Jika $f(x) = 3x^2 + 2x - 1$, maka nilai dari $f'(2)$ adalah...",
      answer_options: [
        { index_option: 0, option: "$14$" },
        { index_option: 1, option: "$12$" },
        { index_option: 2, option: "$10$" },
        { index_option: 3, option: "$8$" },
      ],
    },
    {
      index_question: 11,
      question:
        "Sebuah benda bermassa 2 kg bergerak dengan kecepatan 5 m/s. Energi kinetik benda tersebut adalah...",
      answer_options: [
        { index_option: 0, option: "25 J" },
        { index_option: 1, option: "50 J" },
        { index_option: 2, option: "75 J" },
        { index_option: 3, option: "100 J" },
      ],
    },
    {
      index_question: 12,
      question: "Jumlah proton dalam atom karbon (C) adalah...",
      answer_options: [
        { index_option: 0, option: "6" },
        { index_option: 1, option: "8" },
        { index_option: 2, option: "12" },
        { index_option: 3, option: "14" },
      ],
    },
    {
      index_question: 13,
      question:
        "Himpunan penyelesaian dari pertidaksamaan $2x - 3 > 5$ adalah...",
      answer_options: [
        { index_option: 0, option: "${x | x < 4}$" },
        { index_option: 1, option: "${x | x > 4}$" },
        { index_option: 2, option: "${x | x < -4}$" },
        { index_option: 3, option: "${x | x > -4}$" },
      ],
    },
    {
      index_question: 14,
      question: "Besaran pokok yang digunakan untuk mengukur waktu adalah...",
      answer_options: [
        { index_option: 0, option: "Massa" },
        { index_option: 1, option: "Panjang" },
        { index_option: 2, option: "Waktu" },
        { index_option: 3, option: "Suhu" },
      ],
    },
    {
      index_question: 15,
      question:
        "Ikatan kimia yang terbentuk akibat penggunaan pasangan elektron bersama adalah...",
      answer_options: [
        { index_option: 0, option: "Ikatan ion" },
        { index_option: 1, option: "Ikatan kovalen" },
        { index_option: 2, option: "Ikatan logam" },
        { index_option: 3, option: "Ikatan hidrogen" },
      ],
    },
    {
      index_question: 16,
      question:
        "Nilai dari $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$ adalah...",
      answer_options: [
        { index_option: 0, option: "0" },
        { index_option: 1, option: "2" },
        { index_option: 2, option: "4" },
        { index_option: 3, option: "Tidak ada" },
      ],
    },
    {
      index_question: 17,
      question: "Perubahan wujud benda dari cair menjadi gas disebut...",
      answer_options: [
        { index_option: 0, option: "Mencair" },
        { index_option: 1, option: "Membeku" },
        { index_option: 2, option: "Menguap" },
        { index_option: 3, option: "Mengembun" },
      ],
    },
    {
      index_question: 18,
      question:
        "Unsur-unsur yang terletak dalam satu golongan pada tabel periodik memiliki...",
      answer_options: [
        { index_option: 0, option: "Jumlah proton yang sama" },
        { index_option: 1, option: "Jumlah elektron valensi yang sama" },
        { index_option: 2, option: "Nomor atom yang berurutan" },
        { index_option: 3, option: "Jari-jari atom yang sama" },
      ],
    },
    {
      index_question: 19,
      question:
        "Persamaan garis lurus yang melalui titik (2,3) dan (4,1) adalah...",
      answer_options: [
        { index_option: 0, option: "$y = x + 1$" },
        { index_option: 1, option: "$y = -x + 5$" },
        { index_option: 2, option: "$y = 2x - 1$" },
        { index_option: 3, option: "$y = -2x + 7$" },
      ],
    },
    {
      index_question: 20,
      question:
        '```javascript\nconst x = (x) => x * 2;\n```\n`teting`\n<script>alert("oke")</script>',
      answer_options: [
        { index_option: 0, option: "$\\pi r^{2} t$" },
        { index_option: 1, option: "$F = M A$" },
        { index_option: 2, option: "$\\sum \\frac{\\frac{1}{2}n + 10}{2n}$" },
        { index_option: 3, option: "$\\omega = m a$" },
      ],
    },
  ],
};

export interface iPackageQuestion {
  id: string;
  title: string;
  author: string;
  number_question: number;
  created_at: string;
}

export const listAllPackageQuestion: iPackageQuestion[] = [
  {
    id: "f69ad6b0-7f50-485c-a1f6-64e13492050c",
    title:
      "Eu mollit amet commodo est consequat ex deserunt qui cupidatat ea eiusmod.",
    author: "Reid Rosario",
    number_question: 62,
    created_at: "2015-07-09T06:53:38",
  },
  {
    id: "cc3bf524-c9a0-46b6-975b-67d4a251a59d",
    title: "Ex ex magna exercitation aliqua tempor.",
    author: "Hoffman Burton",
    number_question: 20,
    created_at: "2021-10-18T11:40:14",
  },
  {
    id: "1c970ed8-1131-41b2-8160-d99a21e336b6",
    title: "Irure Lorem ipsum exercitation tempor voluptate sint esse.",
    author: "Lorena Graham",
    number_question: 96,
    created_at: "2023-06-11T09:29:23",
  },
  {
    id: "4bcd1123-7c63-46d4-8e5c-e115d38c963d",
    title:
      "Lorem voluptate ullamco sit sint nulla nostrud nulla ad incididunt tempor qui dolor aliqua.",
    author: "Pitts Carpenter",
    number_question: 76,
    created_at: "2023-07-31T07:23:40",
  },
  {
    id: "8163cd2e-e72f-4160-8014-d251f5a03bf0",
    title:
      "Duis voluptate non consequat enim et in non duis cillum dolore laboris nulla.",
    author: "Long Blankenship",
    number_question: 52,
    created_at: "2021-04-10T09:06:20",
  },
  {
    id: "27980ef0-cce9-4eb5-bd98-4e9ad8298a91",
    title:
      "Voluptate adipisicing ea qui exercitation exercitation irure minim labore.",
    author: "Villarreal Mooney",
    number_question: 59,
    created_at: "2024-11-03T10:41:52",
  },
  {
    id: "8532507c-c7b8-421a-99c5-8cebfaf204ff",
    title:
      "Adipisicing duis eiusmod irure commodo non pariatur sit do laboris eiusmod laborum.",
    author: "Luna Vega",
    number_question: 44,
    created_at: "2020-11-29T08:39:02",
  },
  {
    id: "368cea1b-a35f-49a0-aa92-0bd58f7ab1b8",
    title: "Minim laborum dolore et consequat dolore elit proident eu.",
    author: "Stevenson Mcintyre",
    number_question: 59,
    created_at: "2014-11-10T07:22:08",
  },
  {
    id: "415a7488-dcb4-4fb7-b4e6-06991c39e3e6",
    title:
      "Nisi commodo quis Lorem aliquip est adipisicing enim ut culpa est do occaecat sit.",
    author: "Iris Watkins",
    number_question: 23,
    created_at: "2015-12-04T06:03:46",
  },
  {
    id: "4f4175ea-93c1-4f75-8a8e-f96fc9a8f947",
    title:
      "Irure ad non cupidatat duis consectetur adipisicing ut voluptate id ut et velit velit nostrud.",
    author: "Wheeler Ballard",
    number_question: 20,
    created_at: "2015-02-17T01:48:00",
  },
  {
    id: "a40ed0a5-2352-456e-9744-1bd3f7c11864",
    title:
      "Do deserunt quis proident exercitation laboris aliqua sit eu aute qui fugiat.",
    author: "Marsha Reynolds",
    number_question: 94,
    created_at: "2024-07-24T04:50:46",
  },
  {
    id: "58c48eb4-65a9-42e0-9cf4-6ffe3f8e6600",
    title:
      "Quis ullamco ex voluptate eu ex aute culpa adipisicing laborum cupidatat officia irure ad ipsum.",
    author: "Etta Buckley",
    number_question: 28,
    created_at: "2022-08-25T10:51:41",
  },
  {
    id: "2ad70c17-56ce-451c-a583-9c198b86f103",
    title: "Deserunt non velit ea incididunt in est aliquip nostrud sint.",
    author: "Barrett Ferguson",
    number_question: 26,
    created_at: "2014-06-18T07:30:32",
  },
  {
    id: "dfc01e96-b639-49c6-ace7-b3b17a99b128",
    title:
      "Aliqua elit eu fugiat anim ex occaecat commodo do laboris elit anim aliqua culpa.",
    author: "Ava Washington",
    number_question: 86,
    created_at: "2015-02-12T08:56:55",
  },
  {
    id: "bc69e180-f0ae-46a9-b490-5649168fd41d",
    title: "In aliqua irure amet aliquip in ut eiusmod duis nulla enim.",
    author: "Katharine Hopkins",
    number_question: 79,
    created_at: "2021-01-31T06:11:44",
  },
  {
    id: "38471c82-c561-4e94-9ad7-fb691441964b",
    title: "Cupidatat magna pariatur in minim consequat nostrud et.",
    author: "Herman Ramirez",
    number_question: 22,
    created_at: "2015-07-07T10:51:21",
  },
  {
    id: "ea9f556c-05df-447c-93fd-08c6fb97b5cb",
    title:
      "Amet proident sunt labore elit eiusmod qui nostrud exercitation proident adipisicing minim ut.",
    author: "Kerry Wyatt",
    number_question: 92,
    created_at: "2023-11-10T04:48:58",
  },
  {
    id: "b0e7dc20-8cd0-41f5-9034-eedcf0598f9e",
    title:
      "Veniam cillum sint dolor ipsum sint veniam nisi fugiat qui voluptate dolor.",
    author: "Lawanda Knight",
    number_question: 40,
    created_at: "2021-03-08T09:36:25",
  },
  {
    id: "b57088f8-5abd-42d7-8f2a-826aa4752c2a",
    title: "Laboris laborum ad Lorem magna.",
    author: "Katina Wise",
    number_question: 41,
    created_at: "2017-09-24T02:57:56",
  },
  {
    id: "a68bf0fe-1820-4d09-ae0d-833763b367d4",
    title:
      "Id mollit do ea laboris occaecat ut dolore velit mollit excepteur proident proident.",
    author: "Florine Wong",
    number_question: 48,
    created_at: "2017-01-17T01:18:24",
  },
];

export function GetPackageQuestionById(id: string): iPackageQuestion | null {
  const index = listAllPackageQuestion.findIndex((v) => v.id === id);
  if (index < 0) return null;
  return listAllPackageQuestion[index];
}

export const ListKeyAnswer = [
  { index_question: 1, key: "A", index_key: 0 },
  { index_question: 2, key: "A", index_key: 0 },
  { index_question: 3, key: "A", index_key: 0 },
  { index_question: 4, key: "A", index_key: 0 },
  { index_question: 5, key: "A", index_key: 0 },
  { index_question: 6, key: "A", index_key: 0 },
  { index_question: 7, key: "A", index_key: 0 },
  { index_question: 8, key: "A", index_key: 0 },
  { index_question: 9, key: "A", index_key: 0 },
  { index_question: 10, key: "A", index_key: 0 },
  { index_question: 11, key: "A", index_key: 0 },
  { index_question: 12, key: "A", index_key: 0 },
  { index_question: 13, key: "A", index_key: 0 },
  { index_question: 14, key: "A", index_key: 0 },
  { index_question: 15, key: "A", index_key: 0 },
  { index_question: 16, key: "A", index_key: 0 },
  { index_question: 17, key: "A", index_key: 0 },
  { index_question: 18, key: "A", index_key: 0 },
  { index_question: 19, key: "A", index_key: 0 },
  { index_question: 20, key: "A", index_key: 0 },
  { index_question: 21, key: "A", index_key: 0 },
  { index_question: 22, key: "A", index_key: 0 },
  { index_question: 23, key: "A", index_key: 0 },
  { index_question: 24, key: "A", index_key: 0 },
  { index_question: 25, key: "A", index_key: 0 },
];

export const Courses = [
  "Pjok",
  "Matematika Wajib",
  "Ppkn",
  "B. Inggris",
  "B. Indonesia",
  "Sejarah",
  "Sbk",
  "PABP",
  "Matematika Minat",
  "Antropologi",
  "Fisika",
  "Informatika",
];

export function RandomCourse() {
  return Courses[Math.floor(Math.random() * Courses.length)];
}

export interface iStudentWithScore {
  id: string;
  student_name: string;
  score: number;
  created_at: string;
}

export const StudentWithScore: iStudentWithScore[] = [
  {
    id: "043928a5-d5cf-45e2-aab6-d2ab0461f3ee",
    student_name: "Greer Wyatt Salas",
    score: 70.5,
    created_at: "2024-03-26T10:41:24",
  },
  {
    id: "5e2d87ab-5b02-432d-9fba-c5e5a16c34dc",
    student_name: "Mccarthy Ewing Larson",
    score: 61.7,
    created_at: "2024-10-18T02:08:13",
  },
  {
    id: "4cf4d49b-8d6c-4129-bde3-75a119812478",
    student_name: "Elvia Cross Cameron",
    score: 23.7,
    created_at: "2024-07-09T03:38:13",
  },
  {
    id: "36658dfa-7306-4e74-9fb4-326e1c13249c",
    student_name: "Louisa Knapp Kirby",
    score: 95,
    created_at: "2024-07-11T02:54:03",
  },
  {
    id: "d89abe60-cc6f-457d-b901-cdb0d516b5a1",
    student_name: "Aguilar Odonnell Holt",
    score: 54.1,
    created_at: "2024-08-08T11:25:17",
  },
  {
    id: "8a320e2e-afd3-4c1e-a92e-3d8acf76ab49",
    student_name: "Faulkner Romero Houston",
    score: 80.5,
    created_at: "2024-04-20T04:14:12",
  },
  {
    id: "81268de7-93ab-4a0a-bda1-c3b705a4d339",
    student_name: "Pennington Hayes Kline",
    score: 79.8,
    created_at: "2024-08-13T09:14:18",
  },
  {
    id: "78ec7842-ed7e-4136-999d-00458e329436",
    student_name: "Shelia Patterson Gilmore",
    score: 48.2,
    created_at: "2024-03-27T05:44:35",
  },
  {
    id: "92657ea7-ed83-4f28-8be3-e8935ce4dc27",
    student_name: "Mckay Zimmerman Hardy",
    score: 74.7,
    created_at: "2024-12-04T06:03:29",
  },
  {
    id: "a0f6f9a6-81cb-4ffb-b312-4b8031918a87",
    student_name: "Bell Raymond Sharp",
    score: 58.4,
    created_at: "2024-09-27T01:24:55",
  },
  {
    id: "b8134172-b310-4d41-b079-2c3a1fc47ce5",
    student_name: "Aurelia Yates Mathews",
    score: 59.7,
    created_at: "2024-09-01T07:12:33",
  },
  {
    id: "5caf091b-7213-487c-8d51-e4cd1b98182a",
    student_name: "Tamra Rodriguez Mcmillan",
    score: 27.8,
    created_at: "2024-02-10T08:38:08",
  },
  {
    id: "a540a4d3-0cfa-46b6-aae8-768054113237",
    student_name: "Martin Whitfield Oconnor",
    score: 90.7,
    created_at: "2024-01-17T11:23:58",
  },
  {
    id: "70cfba04-ee8a-40eb-a120-0e08c0542516",
    student_name: "Benita Beasley Porter",
    score: 77.3,
    created_at: "2024-10-29T03:51:04",
  },
  {
    id: "e0877c42-f1fa-483c-82a2-5e8abc38a0d3",
    student_name: "Conner Morgan Talley",
    score: 63.1,
    created_at: "2024-05-13T08:04:40",
  },
  {
    id: "9da948f5-79ba-4bc5-92f0-ef816dd08d2d",
    student_name: "Branch Fields Berg",
    score: 76.1,
    created_at: "2024-06-29T10:04:09",
  },
  {
    id: "b651f21e-2411-4b3d-9cd9-2c67adc29336",
    student_name: "Vargas Harper Guthrie",
    score: 71.9,
    created_at: "2024-08-04T04:34:19",
  },
  {
    id: "7d3d9b7e-bec2-42c2-bae9-34ddde021946",
    student_name: "Sharpe Emerson Brady",
    score: 45.6,
    created_at: "2024-10-21T04:22:29",
  },
  {
    id: "1b1e6756-da1d-4c3a-a468-a26ce2a0367a",
    student_name: "Lilly Contreras Nguyen",
    score: 70.2,
    created_at: "2024-08-09T08:33:56",
  },
  {
    id: "ff94fc59-78e7-4e89-8070-c06641c24a23",
    student_name: "Brooke Osborn Luna",
    score: 66.2,
    created_at: "2024-01-16T12:03:42",
  },
];

export const ListRoom = [
  {
    id: 0,
    room_name: "Experimental",
  },
  {
    id: 1,
    room_name: "Room 1",
  },
  {
    id: 2,
    room_name: "Room 2",
  },
  {
    id: 3,
    room_name: "Room 3",
  },
  {
    id: 4,
    room_name: "Room 4",
  },
  {
    id: 5,
    room_name: "Room 5",
  },
  {
    id: 6,
    room_name: "Room 6",
  },
  {
    id: 7,
    room_name: "Room 7",
  },
  {
    id: 8,
    room_name: "Room 8",
  },
  {
    id: 9,
    room_name: "Room 9",
  },
  {
    id: 10,
    room_name: "Room 10",
  },
];

export interface iListStudent {
  id: string;
  student_name: string;
  username: string;
  password: string;
  student_class: string;
}

export const ListStudents: iListStudent[] = [
  {
    id: "1f54387d-f76b-4519-91c3-ba83c8a74b87",
    student_name: "Nixon Mccormick Mcgee",
    username: "886_Rowe",
    password: "!minim28652",
    student_class: "11 FA",
  },
  {
    id: "720831c7-378f-4146-9fe8-e6607ada6f5b",
    student_name: "Lynn Crane Rivers",
    username: "276_Hillary",
    password: "!adipisicing39248",
    student_class: "11 FA",
  },
  {
    id: "e665b4e1-9a5b-417e-85be-994a217f3361",
    student_name: "Deana Chapman Galloway",
    username: "591_Marshall",
    password: "#id15602",
    student_class: "11 FA",
  },
  {
    id: "9a274184-adc4-40ce-8467-d83c5c3dc5e4",
    student_name: "Nora Carlson Patterson",
    username: "952_Valenzuela",
    password: "#aute32575",
    student_class: "11 FA",
  },
  {
    id: "05da7dfd-eced-47b5-af75-cad01eaae19c",
    student_name: "Bowers Parks Keith",
    username: "439_Mullen",
    password: "%amet45920",
    student_class: "11 FA",
  },
  {
    id: "5847f12f-67b3-4b44-be62-ebdd59a8e47b",
    student_name: "Leonard Odonnell Hopkins",
    username: "396_Rosa",
    password: "$enim70110",
    student_class: "11 FA",
  },
  {
    id: "890481e7-9d90-44bb-b1af-3d08df512a1e",
    student_name: "Wolfe Sloan Keller",
    username: "809_Workman",
    password: "$eu27436",
    student_class: "11 FA",
  },
  {
    id: "bbadfb74-b84f-44ca-ae30-4b89f2e3cb57",
    student_name: "Lara Blake Stafford",
    username: "274_Meyers",
    password: "#officia63490",
    student_class: "11 FA",
  },
  {
    id: "521bef07-faaf-4d65-92d4-e69aa6b83932",
    student_name: "Blanchard Neal Rush",
    username: "179_Wilkins",
    password: "$occaecat80452",
    student_class: "11 FA",
  },
  {
    id: "da96e1d2-11d4-4ef0-b507-60240445f03c",
    student_name: "Tillman Strong Garner",
    username: "280_Clara",
    password: "$nisi77957",
    student_class: "11 FA",
  },
  {
    id: "77b04459-1402-479a-b23f-b059509c1c61",
    student_name: "Tamara Pacheco Walton",
    username: "667_Velma",
    password: "/ut64391",
    student_class: "11 FA",
  },
  {
    id: "1aa82310-6f05-4a81-bc43-54adcc95aab5",
    student_name: "Ray Cole Holman",
    username: "645_Coleen",
    password: "/elit58011",
    student_class: "11 FA",
  },
  {
    id: "b7e58e8e-cdd1-44c9-98f6-b114edcd1a01",
    student_name: "Mcintosh Solis Bartlett",
    username: "870_Alta",
    password: "~est73102",
    student_class: "11 FA",
  },
  {
    id: "e2f230c4-111e-4646-8ba2-c593fc0676aa",
    student_name: "Byrd May Casey",
    username: "265_Moss",
    password: "~in85060",
    student_class: "11 FA",
  },
  {
    id: "89d148a2-eb10-4e08-9644-a089310bcb56",
    student_name: "Dean Lewis Owen",
    username: "127_Maritza",
    password: "#id14044",
    student_class: "11 FA",
  },
  {
    id: "f02a9e2f-6dcc-4519-ab5a-10d8b5afb655",
    student_name: "Lisa Cross Salazar",
    username: "328_Sykes",
    password: "#sunt54707",
    student_class: "11 FA",
  },
  {
    id: "93499deb-dec5-4345-ad9a-9b1f120fcaad",
    student_name: "Rivers Clayton Lawrence",
    username: "857_Farrell",
    password: "!id88485",
    student_class: "11 FA",
  },
  {
    id: "ea931fa9-b812-4c85-90c4-243d65b6ad73",
    student_name: "Goldie Newton Chang",
    username: "384_Manuela",
    password: "/reprehenderit37976",
    student_class: "11 FA",
  },
  {
    id: "70a103d6-eedc-42f6-aff9-e035840312eb",
    student_name: "Benton Russo Landry",
    username: "484_Mavis",
    password: "%eiusmod37730",
    student_class: "11 FA",
  },
  {
    id: "cc3126a3-fa21-47f4-9437-9a3756e73e9a",
    student_name: "Frieda Harrington Steele",
    username: "681_Paula",
    password: "~eu30669",
    student_class: "11 FA",
  },
];
