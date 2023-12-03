"use server";
import axios from "axios";

export type Index = {
  mode: string;
  name: string;
};

export const getIndexList = async () => {
  return (await axios.get("http://127.0.0.1:8080/get-index-list"))
    .data as Index[];
};
