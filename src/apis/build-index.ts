"use server";

import axios from "axios";

const pollIndexStatus = async (task_id: string) => {
  const pollInterval = 3000;
  let statusText = "in_progress";

  const poll = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/index-status/${task_id}`
      );
      const { status } = response.data;

      if (status !== "in_progress") {
        statusText = status;
      } else {
        setTimeout(poll, pollInterval);
      }
    } catch (error) {
      console.error("Error polling index status:", error);
      setTimeout(poll, pollInterval);
    }
  };
  await poll();
  return statusText;
};

export const buildIndex = async (
  indexName: string,
  updateIndex: boolean,
  mode: string
) => {
  const task_id = (
    await axios.post("http://127.0.0.1:8080/build-index", {
      docs_path: "docs",
      index_file: indexName,
      update_index: updateIndex,
      mode: mode,
    })
  ).data.task_id;

  return await pollIndexStatus(task_id);
};
