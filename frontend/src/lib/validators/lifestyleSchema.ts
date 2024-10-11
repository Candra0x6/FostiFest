import { z } from "zod";

export const lifestyleSchema = z.object({
    kebiasaan_merokok: z.enum([
      "Tidak_Merokok",
      "Mantan_Perokok",
      "Perokok_Aktif",
    ]),
    konsumsi_alkohol: z.enum(["Tidak_Pernah", "Kadang_Kadang", "Sering"]),
    pola_konsumsi: z.enum([
      "Seimbang",
      "Vegetarian",
      "Vegan",
      "Tinggi_Protein",
      "Tinggi_Karbohidrat",
      "Rendah_Lemak",
      "Keto",
      "Bebas_Gluten",
      "Tidak_Ada_Diet_Khusus",
    ]),
    aktivitas_fisik: z.enum(["Sangat_Jarang", "Jarang", "Sedang", "Rutin"]),
  });

  export type lifestylePayload = z.infer<typeof lifestyleSchema>;
