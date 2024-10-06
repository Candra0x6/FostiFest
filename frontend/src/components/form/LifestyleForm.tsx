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
  kebiasaanMerokok: z.enum([
    "Tidak Merokok",
    "Mantan Perokok",
    "Perokok Aktif",
  ]),
  konsumsiAlkohol: z.enum(["Tidak Pernah", "Kadang-kadang", "Sering"]),
  polaKonsumsi: z.enum([
    "Seimbang",
    "Vegetarian",
    "Vegan",
    "Tinggi Protein",
    "Tinggi Karbohidrat",
    "Rendah Lemak",
    "Keto",
    "Bebas Gluten",
    "Tidak Ada Diet Khusus",
  ]),
  aktivitasFisik: z.enum(["Sangat Jarang", "Jarang", "Sedang", "Rutin"]),
});

const section = [
  {
    name: "kebiasaanMerokok",
    label: "Kebiasaan Merokok",
    type: "select",
    options: ["Tidak Merokok", "Mantan Perokok", "Perokok Aktif"],
  },
  {
    name: "konsumsiAlkohol",
    label: "Konsumsi Alkohol",
    type: "select",
    options: ["Tidak Pernah", "Kadang-kadang", "Sering"],
  },
  {
    name: "polaKonsumsi",
    label: "Pola Konsumsi",
    type: "select",
    options: [
      "Seimbang",
      "Vegetarian",
      "Vegan",
      "Tinggi Protein",
      "Tinggi Karbohidrat",
      "Rendah Lemak",
      "Keto",
      "Bebas Gluten",
      "Tidak Ada Diet Khusus",
    ],
  },
  {
    name: "aktivitasFisik",
    label: "Aktivitas Fisik",
    type: "select",
    options: ["Sangat Jarang", "Jarang", "Sedang", "Rutin"],
  },
];

type Props = {
  onClick: () => void;
};

export const LifestyleForm: React.FC<Props> = (props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kebiasaanMerokok: "Tidak Merokok",
      konsumsiAlkohol: "Tidak Pernah",
      polaKonsumsi: "Seimbang",
      aktivitasFisik: "Sangat Jarang",
    },
  });

  return (
    <Form {...form}>
      <form className="gap-x-4 grid sm:grid-cols-2 grid-cols-1 gap-4">
        {section.map((value, i) => (
          <FormField
            key={i}
            control={form.control}
            name={
              value.name as
                | "kebiasaanMerokok"
                | "konsumsiAlkohol"
                | "polaKonsumsi"
                | "aktivitasFisik"
            }
            render={({ field }) => (
              <FormItem>
                <FormLabel>{value.label}</FormLabel>
                <FormControl>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={value.label}
                        className="w-full"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{value.label}</SelectLabel>
                        {value.options.map((item, i) => (
                          <SelectItem key={i} value={item}>
                            {item}
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
        ))}
      </form>
      <Button onClick={props.onClick} className="mt-5 w-full">
        Continue
      </Button>
    </Form>
  );
};
