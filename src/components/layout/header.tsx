"use client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Index } from "@/apis/get-index-list";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const formSchema = z.object({
  indexFile: z.string().min(3, {
    message: "Index file must be at least 3 characters.",
  }),
  query: z.string({
    required_error: "Query can not be empty.",
  }),
});

export default function Header({
  onClickQueryButton,
  indexList,
}: {
  onClickQueryButton: (query: string, index: Index) => void;
  indexList: Index[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      indexFile: undefined,
      query: undefined,
    },
  });

  function onSubmit() {
    onClickQueryButton(form.getValues().query, {
      mode: form.getValues().indexFile.split(".")[1],
      name: form.getValues().indexFile.split(".")[0],
    });
  }
  return (
    <header className="w-full flex gap-2 justify-between b rounded-2xl px-2 py-3 mt-4 bg-secondary">
      <p className="font-thin text-4xl text-primary border-primary  rounded-xl">
        PDF Search Engine
      </p>
      <div className="flex gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="search docs..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="indexFile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Index" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {indexList.map((index) => (
                            <SelectItem
                              key={`${index.name}.${index.mode}.pkl`}
                              value={`${index.name}.${index.mode}.pkl`}
                            >
                              {index.name} ({index.mode})
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Query</Button>
          </form>
        </Form>
      </div>
    </header>
  );
}
