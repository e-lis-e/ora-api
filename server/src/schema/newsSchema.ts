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

export const newsSchema = z.object({
  title: z.string(),
  content: z.string(),
  restrictions: z.array(restrictionEnum),
});
