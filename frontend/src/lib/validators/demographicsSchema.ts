import { z } from "zod";

// Custom transformer to handle Decimal as string
const decimalString = z
  .string()
  .refine(
    (value) => {
      return !Number.isNaN(Number(value));
    },
    {
      message: "Invalid decimal string",
    },
  )
  .transform((value) => {
    return value.toString();
  });

export const demographicsSchema = z.object({
  berat_badan: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Berat Badan harus lebih besar dari 0",
    })
    .refine((value) => Number(value) < 200, {
      message: "Berat Badan harus lebih kecil dari 200",
    }),
  tinggi_badan: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Tinggi Badan harus lebih besar dari 0",
    })
    .refine((value) => Number(value) < 500, {
      message: "Tinggi Badan harus lebih kecil dari 500",
    }),
  umur: decimalString
    .refine((value) => Number(value) > 0, {
      message: "Usia harus lebih besar dari 0",
    })
    .refine((value) => Number(value) < 200, {
      message: "Usia harus lebih kecil dari 200",
    }),
    jenis_kelamin: z.string()
});



export type demographicsPayload = {
  berat_badan: number;
  tinggi_badan: number;
  umur: number;
  jenis_kelamin: string;
}