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
    <header className="w-full flex gap-2 justify-between b rounded-2xl px-2 py-3 mt-4 bg-secondary">
      <p className="font-thin text-4xl text-primary border-primary  rounded-xl">
        PDF Search Engine
      </p>
      <div className="flex gap-4 w-[400px]">
        <Input ref={queryRef} placeholder="search docs..." />
        <Button onClick={() => onClickQueryButton(queryRef.current?.value)}>
          Query
        </Button>
      </div>
    </header>
  );
}
