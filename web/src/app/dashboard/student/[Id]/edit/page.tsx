import { iStudent } from "@/lib/features/dashboard/studentSlice";
import FormEditStudent from "./form-edit-student";

export default function PageEditStudent({
  params,
}: {
  params: { Id: string };
}) {
  console.log(params.Id);

  const initData: iStudent = {
    sequence: 1,
    name: "Mnau ",
    username: "mnau1240",
    password: "!kd8211",
    class_room: "11 FA",
  };

  return (
    <div className="pb-20">
      <header className="mb-7 dark:border-neutral-700">
        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Edit Student
        </h1>
      </header>
      <FormEditStudent initData={initData} />
    </div>
  );
}
