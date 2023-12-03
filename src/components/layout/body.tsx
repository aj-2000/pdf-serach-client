import { SearchResults } from "@/apis/query-index";
import ResultTile from "../result-tile";
import { useLocalStorageState } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { TestVisualizer } from "../test-visualizer";
import { TestTable } from "../test-table";

export default function Body({
  queryResults,
}: {
  queryResults: SearchResults;
}) {
  const { pages, docs, query_time } = queryResults;
  const [isRecorded, setIsRecorded] = useState<boolean>(false);

  useEffect(() => {
    setIsRecorded(false);
  }, [queryResults.query_id]);

  const [testData, setTestData] = useLocalStorageState("test-data", []);

  function addTestCase(testCase: any) {
    setIsRecorded(true);
    setTestData((prev: any) => [testCase, ...prev]);
  }

  return (
    <div className="p-2 bg-secondary rounded-3xl">
      <div className="flex justify-between">
        {isRecorded || queryResults.query_id === undefined ? (
          <div className="flex gap-2 items-center">
            <p className="m-2 font-mono text-sm font-bold bg-card border border-primary text-primary rounded-lg p-2 w-[185px]">
              Recorded - {testData?.length}
            </p>
            <TestVisualizer testData={testData} />
            <TestTable testData={testData} />
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                addTestCase({
                  id: queryResults.query_id,
                  mode: queryResults.mode,
                  feedback: "Very Satisfied",
                  query: queryResults.query,
                  queryTime: queryResults.query_time,
                  time: Date.now(),
                  index: queryResults.index,
                });
              }}
              className="m-2 font-mono text-sm font-bold bg-card border border-green-500 text-green-500 rounded-lg p-2 w-[185px]"
            >
              Very Satisfied
            </button>
            <button
              onClick={() => {
                addTestCase({
                  id: queryResults.query_id,
                  mode: queryResults.mode,
                  feedback: "Satisfied",
                  query: queryResults.query,
                  queryTime: queryResults.query_time,
                  time: Date.now(),
                  index: queryResults.index,
                });
              }}
              className="m-2 font-mono text-sm font-bold bg-card border border-yellow-500 text-yellow-500 rounded-lg p-2 w-[185px]"
            >
              Satisfied
            </button>
            <button
              onClick={() => {
                addTestCase({
                  id: queryResults.query_id,
                  mode: queryResults.mode,
                  feedback: "Not Satisfied",
                  query: queryResults.query,
                  queryTime: queryResults.query_time,
                  time: Date.now(),
                  index: queryResults.index,
                });
              }}
              className="m-2 font-mono text-sm font-bold bg-card border border-red-500 text-red-500 rounded-lg p-2 w-[185px]"
            >
              Not Satisfied
            </button>
          </div>
        )}

        {query_time !== undefined ? (
          <p className="m-2 font-mono text-sm font-bold bg-card border border-primary text-primary rounded-lg p-2 w-[185px]">
            took {query_time.toFixed(2)} ms
          </p>
        ) : null}
      </div>

      <div className="flex gap-4">
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
