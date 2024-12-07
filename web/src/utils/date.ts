export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function FormatDate(date_start: string, date_end: string): string {
  const dateStart = new Date(date_start);
  const dateEnd = new Date(date_end);

  if (
    dateStart.getDate() === dateEnd.getDate() &&
    dateStart.getMonth() === dateEnd.getMonth()
  ) {
    return (
      dateStart.getDate() +
      " " +
      Months[dateStart.getMonth()].substring(0, 3) +
      " " +
      dateStart.getFullYear()
    );
  }

  if (
    dateStart.getDate() !== dateEnd.getDate() &&
    dateStart.getMonth() === dateEnd.getMonth()
  ) {
    return (
      dateStart.getDate() +
      " - " +
      dateEnd.getDate() +
      " " +
      Months[dateStart.getMonth()].substring(0, 3) +
      " " +
      dateStart.getFullYear()
    );
  }

  if (
    dateStart.getDate() !== dateEnd.getDate() &&
    (dateStart.getMonth() !== dateEnd.getMonth() ||
      dateStart.getMonth() === dateEnd.getMonth())
  ) {
    return (
      dateStart.getDate() +
      " " +
      Months[dateStart.getMonth()].substring(0, 3) +
      " - " +
      dateEnd.getDate() +
      " " +
      Months[dateEnd.getMonth()].substring(0, 3) +
      " " +
      dateStart.getFullYear()
    );
  }

  return (
    dateStart.getDate() +
    " " +
    Months[dateStart.getMonth()].substring(0, 3) +
    " " +
    dateStart.getFullYear() +
    " - " +
    dateEnd.getDate() +
    " " +
    Months[dateEnd.getMonth()].substring(0, 3) +
    " " +
    dateEnd.getFullYear()
  );
}

export function GetCompositionDateTime(
  date_time: string,
  res_type?: "date" | "time",
): string {
  if (date_time === "") {
    date_time = "1899-12-30T16:52:48.000Z";
  }
  const curDate = new Date(date_time);
  if (res_type === "time") {
    const [hour, minute, second] = [
      curDate.getHours() > 9
        ? curDate.getHours().toString()
        : "0" + curDate.getHours(),
      curDate.getMinutes() > 9
        ? curDate.getMinutes().toString()
        : "0" + curDate.getMinutes(),
      curDate.getSeconds() > 9
        ? curDate.getSeconds().toString()
        : "0" + curDate.getSeconds(),
    ];
    return hour + ":" + minute + ":" + second;
  }
  const [date, month, year] = [
    curDate.getDate(),
    Months[curDate.getMonth() ?? 0],
    curDate.getFullYear(),
  ];
  return date + ", " + month.substring(0, 3) + " " + year;
}
