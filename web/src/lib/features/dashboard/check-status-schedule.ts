export function CheckStatusSchedule(
  date_start: string,
  date_end: string,
): "pending" | "ongoing" | "finish" {
  const dateEnd = new Date(date_end);
  const dateStart = new Date(date_start);
  const dateNow = new Date();

  if (
    dateNow.valueOf() < dateEnd.valueOf() &&
    dateNow.valueOf() > dateStart.valueOf()
  ) {
    return "ongoing";
  }

  if (dateNow.valueOf() > dateEnd.valueOf()) {
    return "finish";
  }

  if (dateNow.valueOf() < dateEnd.valueOf()) {
    return "pending";
  }

  return "finish";
}
