import { getPdfList, PdfFile } from "@/apis/get-pdf-list";
import { openPDF } from "@/lib/utils";

export default function DocListItem({ pdf }: { pdf: PdfFile }) {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full overflow-hidden">
      <div className="space-y-0.5">
        <span className="text-sm text-ellipsis">{pdf.name}</span>
        <p
          onClick={() => openPDF(pdf.path)}
          className="text-xs text-muted-foreground hover:cursor-pointer hover:text-primary"
        >
          {pdf.path}
        </p>
      </div>
    </div>
  );
}
