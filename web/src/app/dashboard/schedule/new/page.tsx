import FormSchedule from "./form-schedule";

export default function NewSchedulePage() {
  return (
    <div className="mx-auto max-w-screen-md pb-20">
      <header className="mb-7 flex items-center justify-between dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Create Schedule
        </h1>
      </header>

      <FormSchedule />
    </div>
  );
}
