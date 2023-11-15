"use client";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function Header({
  onClickQueryButton,
}: {
  onClickQueryButton: (query: string) => void;
}) {
  const queryRef = useRef<any>();
  return (
    <header className="flex flex-col gap-2 p-2">
      <div>PDF Search Engine</div>
      <div className="flex gap-4">
        <Input ref={queryRef} placeholder="search docs..." />
        <Button onClick={() => onClickQueryButton(queryRef.current?.value)}>
          Query
        </Button>
      </div>
    </header>
  );
}
