"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "./ui/switch";
import { buildIndex } from "@/apis/build-index";

export const formSchema = z.object({
  indexName: z.string().min(2, {
    message: "Index name must be at least 2 characters.",
  }),
  mode: z.string({
    required_error: "Please select a mode.",
  }),
  updateIndex: z.boolean().default(false),
});

export type FormType = UseFormReturn<
  {
    indexName: string;
    mode: string;
    updateIndex: boolean;
  },
  any,
  undefined
>;

export function IndexConfigForm({ form }: { form: FormType }) {
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    buildIndex(values.indexName, values.updateIndex, values.mode);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full px-2"
      >
        <FormField
          control={form.control}
          name="indexName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Index file name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modes</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Mode" />
                  </SelectTrigger>
                  <SelectContent className="border-border">
                    <SelectItem value="tfidf">TF-IDF</SelectItem>
                    <SelectItem value="lsi">LSI</SelectItem>
                    <SelectItem value="doc2vec">Doc2Vec</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="updateIndex"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between  bg-card rounded-lg p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Update index</FormLabel>
                <FormDescription>
                  Rebuild index if already exists.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Build</Button>
      </form>
    </Form>
  );
}
