import ViewInputStudent from "./view-input-student";

export default function AddStudentPage() {
  return (
    <div className="pb-20">
      <header className="mb-3 dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Add Student
        </h1>
      </header>
      <ViewInputStudent />
    </div>
  );
}
