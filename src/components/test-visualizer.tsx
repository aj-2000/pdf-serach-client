"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BarChart } from "lucide-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useLocalStorageState } from "@/hooks/use-local-storage";
import { SearchResults } from "@/apis/query-index";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);
const calculateFeedbackPercentage = (data: any) => {
  // Count occurrences of each feedback category
  const feedbackCounts: any = {
    "Very Satisfied": 0,
    Satisfied: 0,
    "Not Satisfied": 0,
  };

  // Count occurrences and calculate total
  let totalFeedbacks = 0;
  data?.forEach((item: any) => {
    if (
      item.feedback === "Very Satisfied" ||
      item.feedback === "Satisfied" ||
      item.feedback === "Not Satisfied"
    ) {
      feedbackCounts[item.feedback]++;
      totalFeedbacks++;
    }
  });

  // Calculate percentage for each category
  const percentages = {
    Satisfied: (feedbackCounts["Satisfied"] / totalFeedbacks) * 100,
    "Not Satisfied": (feedbackCounts["Not Satisfied"] / totalFeedbacks) * 100,
    "Very Satisfied": (feedbackCounts["Very Satisfied"] / totalFeedbacks) * 100,
  };

  return {
    data: Object.values(feedbackCounts),
    percentages: Object.values(percentages),
  };
};

export function TestVisualizer({ testData }: { testData: any[] }) {
  const data = {
    labels: ["Satified", "Not Satisfied", "Very Satisfied"],
    datasets: [
      {
        label: "Feedback",
        data: calculateFeedbackPercentage(testData).percentages,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BarChart className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Test Cases</DialogTitle>
        </DialogHeader>
        <Pie data={data} />
      </DialogContent>
    </Dialog>
  );
}
