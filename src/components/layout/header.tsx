"use client";
import { Button, buttonVariants } from "../ui/button";
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
import { useLocalStorageState } from "@/hooks/use-local-storage";
import { useEffect, useState } from "react";
import { TestVisualizer } from "../test-visualizer";
import { TestTable } from "../test-table";
import { SearchResults } from "@/apis/query-index";
export const formSchema = z.object({
  indexFile: z.string().min(3, {
    message: "Index file must be at least 3 characters.",
  }),
  query: z.string({
    required_error: "Query can not be empty.",
  }),
});
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header({
  onClickQueryButton,
  indexList,
  queryResults,
}: {
  onClickQueryButton: (query: string, index: Index) => void;
  indexList: Index[];
  queryResults: SearchResults;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      indexFile: undefined,
      query: undefined,
    },
  });
  const { setTheme, theme } = useTheme();
  const { query_time } = queryResults;
  const [isRecorded, setIsRecorded] = useState<boolean>(false);
  const [testData, setTestData] = useLocalStorageState("test-data", []);
  useEffect(() => {
    setIsRecorded(false);
  }, [queryResults.query_id]);
  function addTestCase(testCase: any) {
    setIsRecorded(true);
    setTestData((prev: any) => [testCase, ...prev]);
  }

  function onSubmit() {
    onClickQueryButton(form.getValues().query, {
      mode: form.getValues().indexFile.split(".")[1],
      name: form.getValues().indexFile.split(".")[0],
    });
  }
  return (
    <header className="w-full flex gap-2 rounded-lg border border-border px-2 py-3">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex justify-between">
          <p className="font-thin text-4xl text-primary rounded-lg">
            PDF Search Engine
          </p>
          <div className="flex gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-2"
              >
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
                          <SelectContent className="border-border">
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

                <Button variant="outline" type="submit">
                  Query
                </Button>
              </form>
            </Form>
            <Button
              onClick={() => {
                theme === "light" ? setTheme("dark") : setTheme("light");
              }}
              size="icon"
              variant="outline"
            >
              {theme === "light" ? (
                <MoonIcon className="w-4 h-4" />
              ) : (
                <SunIcon className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          {query_time !== undefined && !isRecorded ? (
            <p className="font-mono text-sm font-bold bg-card border border-border text-primary rounded-lg h-10 px-4 py-2">
              took {query_time.toFixed(2)} ms
            </p>
          ) : null}
          {isRecorded || queryResults.query_id === undefined ? (
            <div className="w-full flex justify-between gap-2 items-center">
              <p className="font-mono text-sm  text-primary rounded-lg h-10 px-4 py-2 border border-input bg-background">
                {testData?.length} feedbacks recorded
              </p>
              <div className="flex gap-2">
                <TestVisualizer testData={testData} />
                <TestTable testData={testData} />
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  addTestCase({
                    id: queryResults.query_id,
                    mode: queryResults.mode,
                    feedback: "Very Satisfied",
                    query: queryResults.query,
                    queryTime: queryResults.query_time,
                    time: Date.now(),
                    index: queryResults.index,
                  });
                }}
                className="text-green-500 hover:text-green-500"
              >
                Very Satisfied
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  addTestCase({
                    id: queryResults.query_id,
                    mode: queryResults.mode,
                    feedback: "Satisfied",
                    query: queryResults.query,
                    queryTime: queryResults.query_time,
                    time: Date.now(),
                    index: queryResults.index,
                  });
                }}
                className="text-yellow-500 hover:text-yellow-500"
              >
                Satisfied
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  addTestCase({
                    id: queryResults.query_id,
                    mode: queryResults.mode,
                    feedback: "Not Satisfied",
                    query: queryResults.query,
                    queryTime: queryResults.query_time,
                    time: Date.now(),
                    index: queryResults.index,
                  });
                }}
                className="text-red-500 hover:text-red-500"
              >
                Not Satisfied
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
