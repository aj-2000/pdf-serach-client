"use client";

import { getPdfList, PdfFile } from "@/apis/get-pdf-list";
import DocListItem from "@/components/doc-list-item";
import { FormType, IndexConfigForm } from "@/components/index-config-form";
import { Suspense, useEffect, useState } from "react";

export default function Sidebar({ form }: { form: FormType }) {
  const [pdfList, setPdfList] = useState<PdfFile[]>([]);

  useEffect(() => {
    (async () => {
      setPdfList(await getPdfList());
    })();
  }, []);

  return (
    <aside className="flex flex-col gap-4 h-full overflow-scroll bg-secondary mx-2 my-3 rounded-3xl">
      <Sidebar.Section title="Configure Index">
        <IndexConfigForm form={form} />
      </Sidebar.Section>

      <Sidebar.Section title="Docs">
        <Suspense>
          {pdfList.map((pdf) => (
            <DocListItem key={pdf.path} pdf={pdf} />
          ))}
        </Suspense>
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
    <div className="flex flex-col gap-4 py-4 px-2">
      <span className="text-primary font-bold text-sm">{title}</span>
      <div className="flex flex-col gap-2 items-center">{children}</div>
    </div>
  );
};
