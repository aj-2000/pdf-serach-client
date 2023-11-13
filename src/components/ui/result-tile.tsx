import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./separator";

export type ResultKind = "doc" | "page";

type ResultTitleProps = {
  kind?: ResultKind;
  path?: string;
  cumulativeScore?: number;
  rank?: number;
  page?: number;
  docName?: string;
  sentiment?: string;
};
export default function ResultTile({ kind, path }: ResultTitleProps) {
  if (kind === "doc")
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Path To Enlightment</CardTitle>
          <CardDescription>/users/ajay/document/a.pdf</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Postive</div>
            <Separator orientation="vertical" />
            <div>.9897</div>
            <Separator orientation="vertical" />
            <div>#1</div>
          </div>
        </CardContent>
      </Card>
    );
  else if (kind === "page")
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Page #3</CardTitle>
          <CardDescription>/users/ajay/document/a.pdf</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Postive</div>
            <Separator orientation="vertical" />
            <div>.9897</div>
            <Separator orientation="vertical" />
            <div>#1</div>
          </div>
        </CardContent>
      </Card>
    );
  else return <div>Error: Invalid Result Kind</div>;
}
