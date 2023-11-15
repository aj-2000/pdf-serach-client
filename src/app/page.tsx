"use client";
import { SearchResults, queryIndex } from "@/apis/query-index";
import { formSchema } from "@/components/index-config-form";
import Body from "@/components/layout/body";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      indexName: "index.pkl",
      updateIndex: false,
    },
  });
  const [queryResults, setQueryResults] = useState<SearchResults>({
    pages: [],
    docs: [],
  });
  const onClickQueryButton = async (query: string) => {
    setQueryResults(
      await queryIndex(query, form.getValues().indexName, form.getValues().mode)
    );
  };
  return (
    <main className="flex flex-row gap-4 w-full h-screen">
      <div className="w-[300px]">
        <Sidebar form={form} />
      </div>
      <Separator orientation="vertical" />
      <div className="grow">
        <div className="h-[100px]">
          <Header onClickQueryButton={onClickQueryButton} />
        </div>
        <div className="h-[calc(100vh-100px)] overflow-scroll">
          <Body queryResults={queryResults} />
        </div>
      </div>
    </main>
  );
}
