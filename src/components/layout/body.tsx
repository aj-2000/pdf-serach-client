import { SearchResults } from "@/apis/query-index";
import ResultTile from "../ui/result-tile";

export default function Body({
  queryResults,
}: {
  queryResults: SearchResults;
}) {
  const { pages, docs, query_time } = queryResults;

  return (
    <div className="p-2">
      {!isNaN(query_time) ? (
        <p className="m-2 font-mono text-green-500 border-2 border-green-500 rounded-lg p-2 w-[200px]">
          took {query_time.toFixed(2)} ms
        </p>
      ) : null}
      <div className="flex">
        <div className="flex grow flex-col gap-2">
          <span>Top Pages</span>
          {pages.map((page, i) => (
            <>
              <ResultTile
                key={page.document_name + i}
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
        <div className="flex grow flex-col gap-2">
          <span>Top Documents</span>
          {docs.map((doc, i) => (
            <>
              <ResultTile
                key={doc.document_name + i}
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
    </div>
  );
}
