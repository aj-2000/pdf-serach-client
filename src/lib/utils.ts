import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function openPDF(path: string, pageNumber: number = 1) {
  const serverAddress = "http://127.0.0.1:8080"; // Replace with your server address
  const pdfUrl = `${serverAddress}/${path}#page=${pageNumber}`;
  window.open(pdfUrl, "_blank");
}

export function formatTimestamp(timeStamp: number) {
  const date = new Date(timeStamp);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDateTime;
}
