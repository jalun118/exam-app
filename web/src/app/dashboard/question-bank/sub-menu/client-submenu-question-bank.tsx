"use client";
import { listAllPackageQuestion } from "@/dummy-data";
import { useState } from "react";
import CardListPackage from "./card-list-package-question";

export default function SubmenuQuestionBank() {
  const [page, setPage] = useState(0);
  return (
    <div>
      <div className="mb-7 flex">
        <nav
          className="flex divide-x divide-gray-400 overflow-hidden rounded-full border border-gray-400 transition"
          aria-label="Tabs"
          role="tablist"
        >
          <button
            type="button"
            onClick={() => setPage(0)}
            className={`py-1.5 pl-5 pr-3 text-black ${page === 0 ? "bg-blue-200/50 text-black" : ""}`}
            role="tab"
          >
            My Package
          </button>
          <button
            type="button"
            onClick={() => setPage(1)}
            className={`py-1.5 pl-3 pr-5 text-black ${page === 1 ? "bg-blue-200/50" : ""}`}
            role="tab"
          >
            Home
          </button>
        </nav>
      </div>
      <div aria-label="container-submenu">
        {page === 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>
        )}
        {page === 1 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {listAllPackageQuestion.map((data) => (
              <CardListPackage data={data} key={data.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
