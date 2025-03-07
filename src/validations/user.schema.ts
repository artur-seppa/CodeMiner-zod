import { z } from "zod";

export const userSchema = z.object({
  name: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9._]*$/, "Username must start with a letter or number and contain only letters, numbers, underscores, or dots"),
  email: z.string().email("Invalid email format"),
  birthDate: z
    .string()
    .refine(value => {
      const date = new Date(value);
      return !isNaN(date.getTime()) && date >= new Date("1904-01-01") && date <= new Date(new Date().setFullYear(new Date().getFullYear() - 13));
    }, { message: "Invalid date format or out of range" })
    .transform(value => new Date(value)),
});

export type UserInput = z.infer<typeof userSchema>;

export const validateUser = (user: unknown) => {
  const result = userSchema.safeParse(user);
  if (!result.success) {
    return { success: false, errors: result.error.format() };
  }
  return { success: true, data: result.data };
};
