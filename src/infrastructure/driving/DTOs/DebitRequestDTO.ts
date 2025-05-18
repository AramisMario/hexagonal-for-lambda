//import { Length, Min, Max, IsNumber } from "class-validator";
import { z } from "zod";
import { DebitAccountSchema } from "@domain/models/debitAccount";

const idUser = z.object({
    idUser: z.number()
});

export const DebitRequestDTO = DebitAccountSchema.merge(idUser).required({
    account: true,
    amount: true});

/*
export class RequestDTO{
    
    @Length(10,10, { message: "Numero no valido"})
    public readonly account: string;

    @IsNumber()
    @Min(1, { message: "No alcanza el minimo"})
    @Max(25000, {message: "Supera el maximo"})
    public readonly amount: number;

    constructor(account: string, amount: number){
        this.account = account;
        this.amount = amount;
    }
}
*/