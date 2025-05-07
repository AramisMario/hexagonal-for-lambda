import { Account } from "@domain/entities/account";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export interface RepositoryPortTransaction{
    transaction(account: Account, transactionType: string, amount: number): Promise<DebitedSuccessful>
}
