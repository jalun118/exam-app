"use client";
import { examDataExample, iPackageQuestion, ListKeyAnswer } from "@/dummy-data";
import { useState } from "react";
import CardQuestionView from "./card-question-view";
import PackageQuestionInfo from "./package-question-info";
import SidebarDetail from "./sidebar-detail";

export default function DetailView({ data }: { data: iPackageQuestion }) {
  const listQuestion = examDataExample.quetions;
  const [ShowKey, SetShowKey] = useState(false);

  return (
    <div className="flex flex-col gap-6 pb-20 md:grid md:grid-cols-12">
      <div className="max-w-2xl md:col-span-7">
        <PackageQuestionInfo data={data} />

        <div className="mb-4 mt-4 md:hidden">
          <SidebarDetail
            show_key={ShowKey}
            SetShowKey={(v) => SetShowKey(v)}
            list_key={ListKeyAnswer}
          />
        </div>

        <div className="mt-4">
          <div>
            {listQuestion.map((data_quest, index) => (
              <CardQuestionView
                data_question={data_quest}
                index_question={index}
                key_index={
                  ShowKey ? (ListKeyAnswer.at(index)?.index_key ?? null) : null
                }
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="hidden w-full md:col-span-5 md:block">
        <SidebarDetail
          show_key={ShowKey}
          SetShowKey={(v) => SetShowKey(v)}
          list_key={ListKeyAnswer}
        />
      </div>
    </div>
  );
}
