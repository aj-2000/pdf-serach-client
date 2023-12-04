"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GaugeCircleIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo } from "react";
function calculateAverageMetrics(feedbacks: any[]) {
  let totalDocs = 0;
  let totalPages = 0;
  let totalRecallDocs = 0;
  let totalPrecisionDocs = 0;
  let totalF1ScoreDocs = 0;
  let totalRecallPages = 0;
  let totalPrecisionPages = 0;
  let totalF1ScorePages = 0;

  for (const feedback of feedbacks) {
    const truePositivesDocs = feedback.tpDocs;
    const falsePositivesDocs = feedback.fpDocs;
    const falseNegativesDocs = feedback.fnDocs;

    const truePositivesPages = feedback.tpPages;
    const falsePositivesPages = feedback.fpPages;
    const falseNegativesPages = feedback.fnPages;

    const calculateMetric = (
      truePositives: number,
      falsePositives: number,
      falseNegatives: number
    ) => {
      const recall = truePositives / (truePositives + falseNegatives);
      const precision = truePositives / (truePositives + falsePositives);
      const f1Score = (2 * (precision * recall)) / (precision + recall);

      return {
        recall,
        precision,
        f1Score,
      };
    };

    const docsMetrics = calculateMetric(
      truePositivesDocs,
      falsePositivesDocs,
      falseNegativesDocs
    );
    const pagesMetrics = calculateMetric(
      truePositivesPages,
      falsePositivesPages,
      falseNegativesPages
    );

    totalDocs++;
    totalPages++;
    totalRecallDocs += docsMetrics.recall;
    totalPrecisionDocs += docsMetrics.precision;
    totalF1ScoreDocs += docsMetrics.f1Score;

    totalRecallPages += pagesMetrics.recall;
    totalPrecisionPages += pagesMetrics.precision;
    totalF1ScorePages += pagesMetrics.f1Score;
  }

  const averageMetrics = {
    pages: {
      recall: totalRecallPages / totalPages,
      precision: totalPrecisionPages / totalPages,
      f1Score: totalF1ScorePages / totalPages,
    },
    docs: {
      recall: totalRecallDocs / totalDocs,
      precision: totalPrecisionDocs / totalDocs,
      f1Score: totalF1ScoreDocs / totalDocs,
    },
  };

  return averageMetrics;
}

export function PerformanceMetrics({ testData }: { testData: any[] }) {
  const averageMetrics = calculateAverageMetrics(testData);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <GaugeCircleIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[455px] border-primary-foreground">
        <DialogHeader>
          <DialogTitle>Peformance Metrics</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="flex gap-2">
            <TabsTrigger value="pages">Pages</TabsTrigger>
            <TabsTrigger value="docs">Docs</TabsTrigger>
          </TabsList>
          <TabsContent value="pages">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border w-[105px] p-3">
                <span className="text-3xl">
                  {averageMetrics.pages.recall.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">Recall</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border w-[105px] p-3">
                <span className="text-3xl">
                  {averageMetrics.pages.precision.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">Precision</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border w-[105px] p-3">
                <span className="text-3xl">
                  {averageMetrics.pages.f1Score.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">F1 Score</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="docs">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border w-[105px] p-3">
                <span className="text-3xl">
                  {averageMetrics.docs.recall.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">Recall</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border w-[105px] p-3">
                <span className="text-3xl">
                  {averageMetrics.docs.precision.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">Precision</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg border border-border w-[105px] p-3">
                <span className="text-3xl">
                  {averageMetrics.docs.f1Score.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">F1 Score</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
