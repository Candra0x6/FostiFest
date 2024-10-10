import { z } from "zod";

export const lifestyleSchema = z.object({
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

  export type lifestylePayload = z.infer<typeof lifestyleSchema>;
