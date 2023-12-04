"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Table as TableIcon } from "lucide-react";
import { formatTimestamp } from "@/lib/utils";

export function TestTable({ testData }: { testData: any[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <TableIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[60%] max-h-[80%] overflow-auto no-scrollbar border-border">
        <DialogHeader>
          <DialogTitle>Feedbacks</DialogTitle>
        </DialogHeader>

        <Table className="text-xs">
          <TableCaption>A list of your recorded feedbacks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Recorded at</TableHead>
              <TableHead>Mode</TableHead>
              <TableHead>Index</TableHead>
              <TableHead>Feedback</TableHead>
              <TableHead>Time (ms)</TableHead>
              <TableHead>Query</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testData.map((test, index) => (
              <TableRow key={test.query_id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{formatTimestamp(test.time)}</TableCell>
                <TableCell>{test.mode}</TableCell>
                <TableCell>{test.index}</TableCell>
                <TableCell className="text-right font-bold">
                  {test.feedback}
                </TableCell>
                <TableCell>{test.queryTime.toFixed(2)}</TableCell>
                <TableCell>{test.query}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
