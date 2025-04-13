import { Entity } from "@domain/entities/entity";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export interface RepositoryPortTransaction{
    transaction(account: Entity, transactionType: string, amount: number): Promise<DebitedSuccessful>
}
