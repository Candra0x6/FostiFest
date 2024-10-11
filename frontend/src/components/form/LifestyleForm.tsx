"use client";
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
import { lifestyleSchema } from "@/lib/validators/lifestyleSchema";
import { useUserHealthStore } from "@/store/user-health-store";
type sectionType = {
  name: string;
  label: string;
  type: string;
  options: { id: string; value: string }[];
};
const section: sectionType[] = [
  {
    name: "kebiasaan_merokok",
    label: "Kebiasaan Merokok",
    type: "select",
    options: [
      { id: "Tidak Merokok", value: "Tidak_Merokok" },
      { id: "Mantan Perokok", value: "Mantan_Perokok" },
      { id: "Perokok Aktif", value: "Perokok_Aktif" },
    ],
  },
  {
    name: "konsumsi_alkohol",
    label: "Konsumsi Alkohol",
    type: "select",
    options: [
      { id: "Tidak Pernah", value: "Tidak_Pernah" },
      { id: "Kadang-kadang", value: "Kadang_Kadang" },
      { id: "Sering", value: "Sering" },
    ],
  },
  {
    name: "pola_konsumsi",
    label: "Pola Konsumsi",
    type: "select",
    options: [
      { id: "Seimbang", value: "Seimbang" },
      { id: "Vegetarian", value: "Vegetarian" },
      { id: "Vegan", value: "Vegan" },
      { id: "Tinggi Protein", value: "Tinggi_Protein" },
      { id: "Tinggi Karbohidrat", value: "Tinggi_Karbohidrat" },
      { id: "Rendah Lemak", value: "Rendah_Lemak" },
      { id: "Keto", value: "Keto" },
      { id: "Bebas Gluten", value: "Bebas_Gluten" },
      { id: "Tidak Ada Diet Khusus", value: "Tidak_Ada_Diet_Khusus" },
    ],
  },
  {
    name: "aktivitas_fisik",
    label: "Aktivitas Fisik",
    type: "select",
    options: [
      { id: "Sangat Jarang", value: "Sangat_Jarang" },
      { id: "Jarang", value: "Jarang" },
      { id: "Sedang", value: "Sedang" },
      { id: "Rutin", value: "Rutin" },
    ],
  },
];

type Props = {
  onClick: () => void;
};

export const LifestyleForm: React.FC<Props> = (props) => {
  const { updateUserLifestyle } = useUserHealthStore();
  const form = useForm<z.infer<typeof lifestyleSchema>>({
    resolver: zodResolver(lifestyleSchema),
    defaultValues: {
      kebiasaan_merokok: "Tidak_Merokok",
      konsumsi_alkohol: "Tidak_Pernah",
      pola_konsumsi: "Seimbang",
      aktivitas_fisik: "Sedang",
    },
  });

  const onSubmit = async (data: any) => {
    updateUserLifestyle(data);
    props.onClick();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="gap-x-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
          {section.map((value, i) => (
            <FormField
              key={i}
              control={form.control}
              name={
                value.name as
                  | "kebiasaan_merokok"
                  | "konsumsi_alkohol"
                  | "pola_konsumsi"
                  | "aktivitas_fisik"
              }
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{value.label}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={value.label}
                          className="w-full"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{value.label}</SelectLabel>
                        {value.options.map((item, i) => (
                          <SelectItem key={i} value={item.value}>
                            {item.id}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <Button type="submit" className="mt-5 w-full">
          Continue
        </Button>
      </form>
    </Form>
  );
};
