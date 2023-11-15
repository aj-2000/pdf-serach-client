import axios from "axios";

export type PdfFile = {
  path: string;
  name: string;
};

export const getPdfList = async () => {
  return (await axios.get("http://127.0.0.1:8080/list-pdfs")).data as PdfFile[];
};
