import ModalStudent from "./modal-student";
import PaginationStudent from "./pagination-student";
import TableStudent from "./table-student";

export default function StudentView() {
  return (
    <div className="mt-3">
      <div className="flex flex-col">
        <TableStudent />

        <PaginationStudent />
      </div>
      <ModalStudent />
    </div>
  );
}
