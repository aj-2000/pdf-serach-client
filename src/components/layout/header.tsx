import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header() {
  return (
    <header className="flex flex-col gap-2 p-2">
      <div>PDF Search Engine</div>
      <div className="flex gap-4">
        <Input placeholder="search docs..." />
        <Button>Search</Button>
      </div>
    </header>
  );
}
