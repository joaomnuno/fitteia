"use client";

import { Scatter } from "react-chartjs-2";
import "chart.js/auto";
import React, { useMemo } from "react";

interface GraphProps {
  dataStr: string;
  xLabel: string;
  yLabel: string;
}

export default function Graph({ dataStr, xLabel, yLabel }: GraphProps) {
  const chartData = useMemo(() => {
    const points = dataStr
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"))
      .map((line) => {
        const [x, y] = line.split(/\s+/).map(Number);
        return { x, y };
      })
      .filter((p) => !isNaN(p.x) && !isNaN(p.y));

    return {
      datasets: [
        {
          label: "Data",
          data: points,
          showLine: true,
        },
      ],
    };
  }, [dataStr]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: xLabel } },
        y: { title: { display: true, text: yLabel } },
      },
    }),
    [xLabel, yLabel]
  );

  return <Scatter data={chartData} options={options} className="h-full w-full" />;
}

