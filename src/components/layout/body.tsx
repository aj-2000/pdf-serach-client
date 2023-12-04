import ResultTile from "../result-tile";
import { SearchResults } from "@/apis/query-index";

export default function Body({
  queryResults,
}: {
  queryResults: SearchResults;
}) {
  const { docs, pages } = queryResults;

  return (
    <div className="h-full border border-border rounded-lg overflow-auto py-3 px-2 no-scrollbar">
      <div className="h-full flex gap-4">
        {pages === undefined && docs === undefined ? (
          <div className="w-full h-full flex flex-col gap-20 items-center justify-center p-20">
            <p className="font-light text-4xl text-primary">
              looking for something?
            </p>
            <img
              className="object-fill"
              src="file-searching.svg"
              alt="file searching svg art"
            />
          </div>
        ) : (
          <>
            <div className="flex grow flex-col gap-4">
              <span>Top Pages</span>
              {pages?.map((page, i) => (
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
            <div className="flex grow flex-col gap-4">
              <span>Top Documents</span>
              {docs?.map((doc, i) => (
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
          </>
        )}
      </div>
    </div>
  );
}
