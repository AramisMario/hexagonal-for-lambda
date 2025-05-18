import { z } from "zod";
import { DebitedSuccessfulSchema } from "@domain/models/debitedSucess";

export const DebitResponseDTO = DebitedSuccessfulSchema.extend({});

export type DebitResponseDTOtype = z.infer<typeof DebitResponseDTO>;

/*
export const DebitResponseDTO = z.object({
    debitedAmount: z.number(),
    cost: z.number(),
})

export  type DebitResponseDTOType = z.infer<typeof DebitResponseDTO>;

*/

/*export class ResponseDTO{
    public readonly debitedAmount: number;
    public readonly cost: number;

    constructor(debitedAmount: number, cost: number){
        this.debitedAmount = debitedAmount;
        this.cost = cost;
    }
}*/