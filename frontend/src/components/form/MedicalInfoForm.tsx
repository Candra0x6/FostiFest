import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const formSchema = z.object({
  beratBadan: z.number().gte(1).lte(3),
  tinggiBadan: z.number(),
  usia: z.number(),
  jenisKelamin: z.enum(["Laki-Laki", "Perempuan"]),
});
import { motion } from "framer-motion";
type Props = {
  onClick: () => void;
};

export const UserDetailForm: React.FC<Props> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beratBadan: 0,
      tinggiBadan: 0,
      jenisKelamin: "Laki-Laki",
      usia: 0,
    },
  });

  return (
    <Form {...form}>
      <form className="gap-x-4 grid grid-cols-2">
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="beratBadan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Berat Badan</FormLabel>
                <div className="flex items-center w-full rounded-xl relative">
                  <FormControl>
                    <Input
                      inputMode="decimal"
                      maxLength={1}
                      type="number"
                      placeholder="65.2"
                      step="0.01"
                      pattern="[0-9]+([\.][0-9]+)?"
                      required
                      min="0"
                      max="3"
                      id="decimal_number"
                      {...field}
                    />
                  </FormControl>
                  <span className="absolute right-3 font-bold text-muted">
                    KG
                  </span>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="jenisKelamin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jenis Kelamin</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder="Pilih Jenis Kelamin Anda"
                        className="w-full"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Jenis Kelamin</SelectLabel>
                        <SelectItem value="apple">Laki - Laki</SelectItem>
                        <SelectItem value="banana">Perempuan</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="tinggiBadan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tinggi Badan</FormLabel>
                <div className="flex items-center w-full rounded-xl relative">
                  <FormControl>
                    <Input
                      inputMode="decimal"
                      maxLength={1}
                      type="number"
                      placeholder="172.12"
                      step="0.01"
                      pattern="[0-9]+([\.][0-9]+)?"
                      required
                      min="0"
                      max="3"
                      id="decimal_number"
                      {...field}
                    />
                  </FormControl>
                  <span className="absolute right-3 font-bold text-muted">
                    CM
                  </span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usia"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usia</FormLabel>
                <FormControl>
                  <Input
                    inputMode="numeric"
                    maxLength={1}
                    type="number"
                    placeholder="17"
                    pattern="[0-9]+([\.][0-9]+)?"
                    required
                    min="0"
                    max="1"
                    id="number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
      <Button onClick={props.onClick} className="mt-5 w-full">
        Continue
      </Button>
    </Form>
  );
};
