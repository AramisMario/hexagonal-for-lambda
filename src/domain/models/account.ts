import { z } from "zod";

export const AccountStatusSchema = z.enum(["A","I","C"])

export const AllowedStatusSchema = z.enum(["A"])

export const AccountSchema = z.object({
    id: z.string(),
    status: AccountStatusSchema,
    avaliableBalance: z.number(),
    accountNumber: z.string(),
}).partial({
    id: true
});

export type Account = z.infer<typeof AccountSchema>;