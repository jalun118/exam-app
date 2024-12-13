"use client";
import PaginationTable from "@/components/admin/pagination-table";
import ModalStudent from "./modal-student";
import TableStudent from "./table-student";

export default function StudentView() {
  return (
    <div className="mt-3">
      <div className="flex flex-col">
        <TableStudent />

        <PaginationTable
          paginationEvent={(e) => console.log(e)}
          metaData={{ end_data: 10, start_data: 1, total_data: 10000 }}
        />
      </div>
      <ModalStudent />
    </div>
  );
}
