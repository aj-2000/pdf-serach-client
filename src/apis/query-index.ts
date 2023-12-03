"use server";
import axios from "axios";

type Page = {
  document_name: string;
  path: string;
  page_number: number;
  score: number;
  sentiment: number;
};

type Document = {
  document_name: string;
  path: string;
  cumulative_score: number;
  sentiment: number;
};

export type SearchResults = {
  pages?: Page[];
  docs?: Document[];
  query_time?: number;
  query_id?: string;
  query?: string;
  mode?: string;
};

export const queryIndex = async (
  query: string,
  indexName: string = "tfidf.pkl",
  mode: string = "tfidf"
) => {
  return (
    await axios.post("http://127.0.0.1:8080/query", {
      query: query,
      index_file: indexName,
      mode: mode,
    })
  ).data as SearchResults;
};
