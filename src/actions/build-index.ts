"use server";

import axios from "axios";

export const buildIndex = async (
  indexName: string,
  updateIndex: boolean,
  mode: string
) => {
  axios.post("http://127.0.0.1:8080/build-index", {
    docs_path: "docs",
    index_file: indexName,
    update_index: updateIndex,
    mode: mode,
  });
};
