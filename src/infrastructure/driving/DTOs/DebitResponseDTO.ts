import { z } from "zod";

export const DebitResponseDTO = z.object({
    debitedAmount: z.number(),
    cost: z.number(),
})

export  type DebitResponseDTOType = z.infer<typeof DebitResponseDTO>;

/*export class ResponseDTO{
    public readonly debitedAmount: number;
    public readonly cost: number;

    constructor(debitedAmount: number, cost: number){
        this.debitedAmount = debitedAmount;
        this.cost = cost;
    }
}*/