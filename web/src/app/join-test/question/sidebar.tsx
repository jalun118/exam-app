import { lazy, Suspense } from "react";
import { LoadingSpiner } from "../../../components/regular/Loading";
import PanelContainer from "../../../components/regular/panel-question/panel-container";

const ClockSidebar = lazy(() => import("./clock"));

export default function Sidebar() {
  return (
    <div className="flex w-full flex-col items-center justify-center border border-gray-500 pb-4">
      <div className="relative h-40 w-40">
        <Suspense
          fallback={
            <div className="py-16">
              <LoadingSpiner />
            </div>
          }
        >
          <ClockSidebar />
        </Suspense>
      </div>
      <PanelContainer />
    </div>
  );
}
