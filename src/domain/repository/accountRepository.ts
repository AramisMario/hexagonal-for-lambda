import { Account } from "@domain/entities/account";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export interface AccountRepository<T = unknown>{
    create(entityProps:Account): Promise<Account>
    delete(data: Account): Promise<boolean>
    findByID(id: T): Promise<Account>
    transaction(account: Account, transactionType: string, amount: number): Promise<DebitedSuccessful>
    update(data:Account): Promise<Account>
}