import { PdfFile } from "@/apis/get-pdf-list";
import { openPDF } from "@/lib/utils";

export default function DocListItem({ pdf }: { pdf: PdfFile }) {
  return (
    <div
      onClick={() => openPDF(pdf.path)}
      className="flex flex-row items-center hover:border hover:border-primary hover:cursor-pointer justify-between rounded-lg bg-card p-3 shadow-sm w-full"
    >
      <div className="w-full space-y-0.5">
        <span className="w-full text-sm overflow-clip">{pdf.name}</span>
        <p className="w-full text-xs text-muted-foreground overflow-clip">
          {pdf.path}
        </p>
      </div>
    </div>
  );
}
