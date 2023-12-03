"use client";
import { SearchResults, queryIndex } from "@/apis/query-index";
import { formSchema } from "@/components/index-config-form";
import Body from "@/components/layout/body";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Index, getIndexList } from "@/apis/get-index-list";

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      indexName: "test",
      updateIndex: false,
    },
  });

  const [queryResults, setQueryResults] = useState<SearchResults>({
    pages: undefined,
    docs: undefined,
    query_time: undefined,
    query_id: undefined,
  });

  const [indexList, setIndexList] = useState<Index[]>([]);

  const onClickQueryButton = async (query: string, index: Index) => {
    if (query) setQueryResults(await queryIndex(query, index.name, index.mode));
  };

  useEffect(() => {
    (async () => {
      setIndexList(await getIndexList());
    })();
  }, []);

  return (
    <main className="grid grid-cols-12 bg-background max-w-screen">
      <div className="col-span-3 max-h-screen px-2 py-3">
        <Sidebar setIndexList={setIndexList} form={form} />
      </div>

      <div className="flex flex-col gap-4 justify-between col-span-9 max-h-screen px-2 py-3">
        <div className="">
          <Header
            queryResults={queryResults}
            indexList={indexList}
            onClickQueryButton={onClickQueryButton}
          />
        </div>
        <div className="h-[calc(100vh-210px)]">
          <Body queryResults={queryResults} />
        </div>
      </div>
    </main>
  );
}
