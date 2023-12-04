"use client";

import { getPdfList, PdfFile } from "@/apis/get-pdf-list";
import DocListItem from "@/components/doc-list-item";
import { FormType, IndexConfigForm } from "@/components/index-config-form";
import { useEffect, useState } from "react";

export default function Sidebar({
  form,
  setIndexList,
}: {
  form: FormType;
  setIndexList: any;
}) {
  const [pdfList, setPdfList] = useState<PdfFile[]>([]);

  useEffect(() => {
    (async () => {
      setPdfList(await getPdfList());
    })();
  }, []);

  return (
    <aside className="gap-4 border border-border rounded-lg h-full w-full overflow-auto no-scrollbar">
      <Sidebar.Section title="Build Index">
        <IndexConfigForm setIndexList={setIndexList} form={form} />
      </Sidebar.Section>

      <Sidebar.Section title="Docs">
        {pdfList.map((pdf) => (
          <DocListItem key={pdf.path} pdf={pdf} />
        ))}
      </Sidebar.Section>
    </aside>
  );
}

Sidebar.Section = function SidebarSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4 py-3 px-2">
      <span className="text-primary font-bold text-sm">{title}</span>
      <div className="flex flex-col gap-2 items-center">{children}</div>
    </div>
  );
};
