import { SearchResults } from "@/apis/query-index";
import ResultTile from "../ui/result-tile";
import { useId } from "react";

export default function Body({
  queryResults,
}: {
  queryResults: SearchResults;
}) {
  const { pages, docs } = queryResults;

  return (
    <div className="flex">
      <div className="flex grow flex-col gap-2 p-2">
        <span>Top Pages</span>
        {pages.map((page, i) => (
          <>
            <ResultTile
              key={useId()}
              kind="page"
              docName={page.document_name}
              score={page.score}
              pageNumber={page.page_number}
              path={page.path}
              rank={i + 1}
              sentiment={String(page.sentiment)}
            />
          </>
        ))}
      </div>
      <div className="flex grow flex-col gap-2 p-2">
        <span>Top Documents</span>
        {docs.map((doc, i) => (
          <>
            <ResultTile
              key={useId()}
              kind="doc"
              rank={i + 1}
              path={doc.path}
              docName={doc.document_name}
              score={doc.cumulative_score}
            />
          </>
        ))}
      </div>
    </div>
  );
}
