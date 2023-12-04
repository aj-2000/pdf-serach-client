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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

ChartJS.register(ArcElement, Tooltip, Legend);
const calculateFeedbackData = (data: any) => {
  const feedbackCounts: any = {
    "Very Satisfied": 0,
    Satisfied: 0,
    "Not Satisfied": 0,
  };

  let totalFeedbacks = 0;
  let totalQueryTime = 0;
  data?.forEach((item: any) => {
    if (
      item.feedback === "Very Satisfied" ||
      item.feedback === "Satisfied" ||
      item.feedback === "Not Satisfied"
    ) {
      feedbackCounts[item.feedback]++;
      totalFeedbacks++;
      totalQueryTime += item.queryTime;
    }
  });

  const percentages = {
    "Very Satisfied": (feedbackCounts["Very Satisfied"] / totalFeedbacks) * 100,
    Satisfied: (feedbackCounts["Satisfied"] / totalFeedbacks) * 100,
    "Not Satisfied": (feedbackCounts["Not Satisfied"] / totalFeedbacks) * 100,
  };

  return {
    percentages: Object.values(percentages) || [],
    avgQueryTime: data.length === 0 ? NaN : totalQueryTime / data.length,
  };
};

const groupByMode = (data: any): Record<string, any[]> => {
  const groupedData: Record<string, any[]> = {
    lsi: [],
    tfidf: [],
    doc2vec: [],
  };

  data.forEach((item: any) => {
    const { mode, ...rest } = item;
    if (!groupedData[mode]) {
      groupedData[mode] = [];
    }
    groupedData[mode].push(rest);
  });

  return groupedData;
};
const getPieData = (percentages: number[]) => {
  return {
    labels: ["Very Satisfied", "Satisfied", "Not Satisfied"],
    datasets: [
      {
        label: "Feedback",
        data: percentages,
        backgroundColor: [
          "rgba(34, 197, 94, 0.2)",
          "rgba(234, 179, 8, 0.2)",
          "rgba(239, 68, 68, 0.2)",
        ],
        borderColor: [
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
export function TestVisualizer({ testData }: { testData: any[] }) {
  const { percentages, avgQueryTime } = calculateFeedbackData(testData);
  const { lsi, tfidf, doc2vec } = groupByMode(testData);
  const lsiData = calculateFeedbackData(lsi);
  const tfidfData = calculateFeedbackData(tfidf);
  const doc2vecData = calculateFeedbackData(doc2vec);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <BarChart className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px] border-primary-foreground">
        <DialogHeader>
          <DialogTitle>Feedbacks</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="flex gap-2">
            <TabsTrigger value="all">ALL</TabsTrigger>
            <TabsTrigger value="tfidf">TF-IDF</TabsTrigger>
            <TabsTrigger value="lsi">LSI</TabsTrigger>
            <TabsTrigger value="doc2vec">Doc2Vec</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {!isNaN(avgQueryTime) ? (
              <p className="text-sm mb-2">
                Avg. query time: {avgQueryTime.toFixed(2)} ms
              </p>
            ) : null}
            {testData.length > 0 ? (
              <Pie id="all" data={getPieData(percentages)} />
            ) : (
              <p>No feedbacks recorded!</p>
            )}
          </TabsContent>
          <TabsContent value="tfidf">
            {!isNaN(tfidfData.avgQueryTime) ? (
              <p className="text-sm mb-2">
                Avg. query time: {tfidfData.avgQueryTime.toFixed(2)} ms
              </p>
            ) : null}
            {tfidf?.length > 0 ? (
              <Pie id="tfidf" data={getPieData(tfidfData.percentages)} />
            ) : (
              <p>No feedbacks recorded!</p>
            )}
          </TabsContent>
          <TabsContent value="lsi">
            {!isNaN(lsiData.avgQueryTime) ? (
              <p className="text-sm mb-2">
                Avg. query time: {lsiData.avgQueryTime.toFixed(2)} ms
              </p>
            ) : null}
            {lsi?.length > 0 ? (
              <Pie id="lsi" data={getPieData(lsiData.percentages)} />
            ) : (
              <p>No feedbacks recorded!</p>
            )}
          </TabsContent>
          <TabsContent value="doc2vec">
            {!isNaN(doc2vecData.avgQueryTime) ? (
              <p className="text-sm mb-2">
                Avg. query time: {doc2vecData.avgQueryTime.toFixed(2)} ms
              </p>
            ) : null}
            {doc2vec.length > 0 ? (
              <Pie id="doc2vec" data={getPieData(doc2vecData.percentages)} />
            ) : (
              <p>No feedbacks recorded!</p>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
