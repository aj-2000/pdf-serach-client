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
