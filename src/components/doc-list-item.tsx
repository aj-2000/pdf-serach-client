import { PdfFile } from "./layout/sidebar";

export default function DocListItem({ pdf }: { pdf: PdfFile }) {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm w-full overflow-hidden">
      <div className="space-y-0.5">
        <span className="text-sm text-ellipsis">{pdf.name}</span>
        <p className="text-xs text-muted-foreground">{pdf.path}</p>
      </div>
    </div>
  );
}
