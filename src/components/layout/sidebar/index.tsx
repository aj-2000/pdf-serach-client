import DocListItem from "@/components/doc-list-item";
import { IndexConfigForm } from "@/components/index-config-form";
import axios from "axios";
import { Suspense } from "react";

export type PdfFile = {
  path: string;
  name: string;
};

export default async function Sidebar() {
  const pdfList = (await axios.get("http://127.0.0.1:8080/list-pdfs"))
    .data as PdfFile[];

  return (
    <aside className="flex flex-col gap-4 h-full overflow-scroll">
      <Sidebar.Section title="Configure Index">
        <IndexConfigForm />
      </Sidebar.Section>

      <Sidebar.Section title="Docs">
        <Suspense>
          {pdfList.map((pdf) => (
            <DocListItem pdf={pdf} />
          ))}
        </Suspense>
      </Sidebar.Section>
    </aside>
  );
}

Sidebar.Section = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <div className="flex flex-col gap-4 py-4 px-2">
      <span className="text-primary font-bold text-sm">{title}</span>
      <div className="flex flex-col gap-2 items-center"> {children}</div>
    </div>
  );
};
