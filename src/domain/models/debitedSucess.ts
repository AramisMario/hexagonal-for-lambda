import { z } from "zod";

export const DebitedSuccessfulSchema = z.object({
    debitedAmount: z.number(),
    cost: z.number()
})

export type DebitedSuccessful = z.infer<typeof DebitedSuccessfulSchema>;