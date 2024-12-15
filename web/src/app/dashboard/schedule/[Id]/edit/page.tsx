import FormEditSchedule from "./FormEditSchedule";

export default function Page({ params }: { params: { Id: string } }) {
  return (
    <div className="mx-auto max-w-screen-md pb-20">
      <header className="mb-7 flex items-center justify-between dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Edit Schedule {params.Id}
        </h1>
      </header>

      <FormEditSchedule />
    </div>
  );
}
