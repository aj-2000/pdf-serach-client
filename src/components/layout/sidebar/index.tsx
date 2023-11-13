import { IndexConfigForm } from "@/components/index-config-form";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 h-full overflow-scroll">
      <Sidebar.Section title="Configure Index">
        <IndexConfigForm />
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
