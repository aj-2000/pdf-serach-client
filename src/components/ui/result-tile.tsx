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
  score?: number;
  rank?: number;
  pageNumber?: number;
  docName?: string;
  sentiment?: string;
};
export default function ResultTile({
  kind,
  path,
  sentiment,
  score,
  docName,
  pageNumber,
  rank,
}: ResultTitleProps) {
  if (kind === "doc")
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">{docName}</CardTitle>
          <CardDescription>{path}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>{score}</div>
            <Separator orientation="vertical" />
            <div>#{rank}</div>
          </div>
        </CardContent>
      </Card>
    );
  else if (kind === "page")
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">
            <p>
              Page #{pageNumber} of{" "}
              <span className="text-sm align-middle ml-2 text-muted-foreground">
                {docName}
              </span>
            </p>
          </CardTitle>
          <CardDescription>{path}</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>{sentiment}</div>
            <Separator orientation="vertical" />
            <div>{score}</div>
            <Separator orientation="vertical" />
            <div>#{rank}</div>
          </div>
        </CardContent>
      </Card>
    );
  else return <div>Error: Invalid Result Kind</div>;
}
