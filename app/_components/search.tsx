"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "./ui/form";
import { FieldSet } from "./ui/field";

const formSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "Digite algo para buscar" }),
});

const Search = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = (values: z.infer<typeof formSchema>) => {
    const query = new URLSearchParams({ q: values.search.trim() });
    router.push(`/search?${query.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSearch)}>
        <FieldSet className="flex-row items-stretch gap-2">
          <div className="w-full max-w-xl flex-1 rounded-xl border border-border bg-card p-2 shadow-sm">
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="search"
                      placeholder="Faça sua busca"
                      aria-label="Buscar barbearias e serviços"
                      className="w-full border-0 bg-transparent p-2 text-gray-700 shadow-none placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            aria-label="Buscar"
            className="h-auto rounded-lg bg-indigo-500 p-4 text-white hover:bg-indigo-700 focus:bg-indigo-700 focus:outline-none"
          >
            <SearchIcon />
          </Button>
        </FieldSet>
      </form>
    </Form>
  );
};

export default Search;