import { z } from "zod";

export const AccountSchema = z.object({
    id: z.string(),
    status: z.string(),
    avaliableBalance: z.number(),
    accountNumber: z.string(),
}).partial({
    id: true
})

export type Account = z.infer<typeof AccountSchema>;