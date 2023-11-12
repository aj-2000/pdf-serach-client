import { title } from "process";
import ModeInput from "./mode-input";
import { Separator } from "@/components/ui/separator";

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-4 px-2 py-4 h-full overflow-scroll items-center">
      <Sidebar.Section title="Modes">
        <ModeInput />
        <ModeInput />
        <ModeInput />
        <ModeInput />
      </Sidebar.Section>

      <Sidebar.Section title="Modes">
        <ModeInput />
        <ModeInput />
        <ModeInput />
        <ModeInput />
      </Sidebar.Section>

      <Sidebar.Section title="Modes">
        <ModeInput />
        <ModeInput />
        <ModeInput />
        <ModeInput />
      </Sidebar.Section>

      <Sidebar.Section title="Modes">
        <ModeInput />
        <ModeInput />
        <ModeInput />
        <ModeInput />
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
    <div className="flex flex-col gap-2 p-2">
      <span className="text-primary font-bold text-sm">{title}</span>
      <div className="flex flex-col gap-2 items-center"> {children}</div>
    </div>
  );
};
