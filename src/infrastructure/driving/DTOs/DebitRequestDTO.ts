import { DebitAccountSchema } from "@domain/models/debitAccount";

export const DebitRequestDTO = DebitAccountSchema.extend({});


/*
export const DebitRequestDTO = DebitAccountSchema.merge(idUser).required({
    account: true,
    amount: true});
*/

