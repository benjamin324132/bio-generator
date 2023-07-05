import { z } from "zod";

export const formSchema = z.object({
  bio: z
    .string()
    .min(10, { message: "Agrega un texto mayor a 10 caracteres." })
    .max(120, { message: "Agrega un texto menor a 120 caracteres." }),
  type: z.string().optional(),
});
