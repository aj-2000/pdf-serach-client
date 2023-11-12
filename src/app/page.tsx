import Body from "@/components/layout/body";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex flex-row gap-4 w-full h-screen">
      <div className="w-[250px]">
        <Sidebar />
      </div>
      <Separator orientation="vertical" />
      <div className="grow">
        <div>
          <Header />
        </div>
        <div>
          <Body />
        </div>
      </div>
    </main>
  );
}
