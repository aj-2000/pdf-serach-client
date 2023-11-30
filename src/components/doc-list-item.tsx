import { getPdfList, PdfFile } from "@/apis/get-pdf-list";
import { openPDF } from "@/lib/utils";

export default function DocListItem({ pdf }: { pdf: PdfFile }) {
  return (
    <div
      onClick={() => openPDF(pdf.path)}
      className="flex flex-row items-center hover:border hover:border-primary hover:cursor-pointer justify-between rounded-lg bg-card p-3 shadow-sm w-full overflow-hidden"
    >
      <div className="space-y-0.5">
        <span className="text-sm text-ellipsis">{pdf.name}</span>
        <p className="text-xs text-muted-foreground ">{pdf.path}</p>
      </div>
    </div>
  );
}
