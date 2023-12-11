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
export const f1FormSchema = z.object({
  tpDocs: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "TP Docs must be a number" })
      .nonnegative("TP Docs cannot be negative")
      .optional()
  ),
  fpDocs: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "FP Docs must be a number" })
      .nonnegative("FP Docscannot be negative")
      .optional()
  ),
  fnDocs: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "FP Docs must be a number" })
      .nonnegative("FP Docs cannot be negative")
      .optional()
  ),

  tpPages: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "TP Pages must be a number" })
      .nonnegative("TP Pages cannot be negative")
      .optional()
  ),
  fpPages: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "FP Pages must be a number" })
      .nonnegative("FP Pages cannot be negative")
      .optional()
  ),
  fnPages: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ invalid_type_error: "FP Pages must be a number" })
      .nonnegative("FP Pages cannot be negative")
      .optional()
  ),
  feedback: z.string({
    required_error: "feedback is required.",
  }),
});
import { SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { PerformanceMetrics } from "../performance-metrics";

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
  const f1Form = useForm<z.infer<typeof f1FormSchema>>({
    resolver: zodResolver(f1FormSchema),
    defaultValues: {},
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    onClickQueryButton(values.query, {
      mode: values.indexFile.split(".")[1],
      name: values.indexFile.split(".")[0],
    });
  }

  function onRecord(values: z.infer<typeof f1FormSchema>) {
    addTestCase({
      id: queryResults.query_id,
      mode: queryResults.mode,
      feedback: values.feedback,
      query: queryResults.query,
      queryTime: queryResults.query_time,
      time: Date.now(),
      index: queryResults.index,
      tpDocs: values.tpDocs,
      fpDocs: values.fpDocs,
      fnDocs: values.fnDocs,
      tpPages: values.tpPages,
      fpPages: values.fpPages,
      fnPages: values.fnPages,
    });
  }
  return (
    <header className="w-full flex gap-2 rounded-lg border border-border px-2 py-3">
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex justify-between">
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
                        <Input
                          className="w-[480px]"
                          {...field}
                          placeholder="search docs..."
                        />
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
          </div>
        </div>
        <div className="flex justify-between gap-2">
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
                <PerformanceMetrics testData={testData} />
              </div>
            </div>
          ) : (
            <Form {...f1Form}>
              <form
                onSubmit={f1Form.handleSubmit(onRecord)}
                className="flex gap-2"
              >
                <FormField
                  control={f1Form.control}
                  name="tpDocs"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-28"
                          type="number"
                          placeholder="TP Docs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={f1Form.control}
                  name="fpDocs"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-28"
                          type="number"
                          placeholder="FP Docs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={f1Form.control}
                  name="fnDocs"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-28"
                          type="number"
                          placeholder="FN Docs"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={f1Form.control}
                  name="tpPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-28"
                          type="number"
                          placeholder="TP Pages"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={f1Form.control}
                  name="fpPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-28"
                          type="number"
                          placeholder="FP Pages"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={f1Form.control}
                  name="fnPages"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="w-28"
                          type="number"
                          placeholder="FN Pages"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={f1Form.control}
                  name="feedback"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Feedback" />
                          </SelectTrigger>
                          <SelectContent className="border-border">
                            <SelectItem value="Very Satisfied">
                              Very Satisfied
                            </SelectItem>
                            <SelectItem value="Satisfied">Satisfied</SelectItem>
                            <SelectItem value="Not Satisfied">
                              Not Satisfied
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button variant="outline" type="submit">
                  Record
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </header>
  );
}
