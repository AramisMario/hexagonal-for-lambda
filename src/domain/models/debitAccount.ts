import { z } from "zod";

export const DebitAccountSchema = z.object({
    account: z.string(),
    amount: z.number()
});

export type DebitAccount = z.infer<typeof DebitAccountSchema>;