"use client";
import { LoadingSpiner } from "@/components/regular/Loading";
import { Months } from "@/utils/date";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="py-20">
      <LoadingSpiner />
    </div>
  ),
});

export default function ChartScore() {
  return (
    <div className="col-span-6 rounded-xl border border-gray-400 py-3">
      <h3 className="px-5 text-xl font-semibold">Average Score</h3>
      <div className="overflow-x-auto overflow-y-hidden px-3">
        <Chart
          options={{
            chart: {
              id: "basic-bar",
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
            },
            stroke: {
              curve: "monotoneCubic",
              width: 3,
            },
            yaxis: {
              tickAmount: 4,
              labels: {
                maxWidth: 140,
                minWidth: 0,
                style: {
                  colors: "#9ca3af",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              },
            },
            markers: {
              size: 4,
              hover: {
                size: 5,
              },
            },
            xaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: true,
              },
              crosshairs: {
                stroke: {
                  dashArray: 0,
                },
                dropShadow: {
                  enabled: false,
                },
              },
              tooltip: {
                enabled: false,
              },
              labels: {
                style: {
                  colors: "#9ca3af",
                  fontSize: "13px",
                  fontWeight: 400,
                },
              },
              categories: Months.map((v) => v.substring(0, 3)),
            },
            grid: {
              show: true,
            },
            legend: {
              show: false,
            },
            dataLabels: {
              enabled: false,
            },
          }}
          series={[
            {
              name: "Score",
              data: [71, 92, 95, 61, null, null, 96, 100, 46, 60, 80, 53],
              type: "line",
              color: "#14b8a6",
            },
          ]}
          width="100%"
          height={200}
        />
      </div>
    </div>
  );
}
