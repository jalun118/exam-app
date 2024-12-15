import DetailView from "./detail-view";

export default function DeatilSchedule({ params }: { params: { Id: string } }) {
  return (
    <div>
      <header className="mb-2 md:mb-7">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Detail Schedule {params.Id}
        </h1>
      </header>
      <DetailView id_schedule={params.Id} />
    </div>
  );
}
