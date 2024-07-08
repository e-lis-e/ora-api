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

 export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  restrictions: z.array(restrictionEnum),
});