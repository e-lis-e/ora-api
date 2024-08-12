import { z } from "zod";

const restrictionEnum = z.enum([
  "CELIACO",
  "LACTOSE",
  "DIABETES",
  "HIPERTENSAO",
  "VEGANO",
  "VEGETARIANO",
  "APLV",
  "TIREOIDE",
  "FRUTOS_DO_MAR",
  "NOZES",
]);

export const serviceSchema = z.object({
  name: z.string(),
  description: z.string(),
  restrictions: z.array(restrictionEnum),
});
