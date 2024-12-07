export function GetBadgeStatus(status: "pending" | "ongoing" | "finish") {
  if (status === "finish") {
    return (
      <span className="relative inline-flex items-center gap-x-1.5 rounded-full bg-red-100 px-3 py-1.5 text-xs font-medium text-red-800 dark:bg-red-800/30 dark:text-red-500">
        <span className="inline-block size-1.5 rounded-full bg-red-800"></span>
        Finish
      </span>
    );
  }

  if (status === "ongoing") {
    return (
      <span className="relative inline-flex items-center gap-x-1.5 rounded-full bg-teal-100 px-3 py-1.5 text-xs font-medium text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
        <span className="inline-block size-1.5 rounded-full bg-teal-800"></span>
        On Going
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-x-1.5 rounded-full bg-yellow-100 px-3 py-1.5 text-xs font-medium text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-500">
      <span className="inline-block size-1.5 rounded-full bg-yellow-800"></span>
      Pending
    </span>
  );
}
