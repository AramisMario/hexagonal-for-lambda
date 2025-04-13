import { TransactionCasePort } from "@primaryPorts/useCases/transactionCasePort";
import { Entity } from "@domain/entities/entity";
import { TransactionTypes } from "@domain/types/transactions";
import { RepositoryPortTransaction } from "@domain/ports/repository/repositoryPortTransact";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export type dependenciesType = {
    repositoryTransaction: RepositoryPortTransaction
};

export type dataType = {
    account: Entity, 
    amount: number
}


export class TransactionCase implements TransactionCasePort{

    async exec(data: dataType, dependencies: dependenciesType): Promise<DebitedSuccessful>{
        
        const { repositoryTransaction } = dependencies;
        const { account, amount } = data;

        try{
            return await repositoryTransaction.transaction(account, TransactionTypes.DEBIT, amount);
        }catch(error){
            // handle and log the error
            throw error;
        }
    }

}