import { TransactionCasePort } from "@primaryPorts/useCases/transactionCasePort";
import { Entity } from "@domain/entities/entity";
import { TransactionTypes } from "@domain/types/transactions";
import { RepositoryPort } from "@application/ports/secondaryPorts/repository/repositoryPort";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export type dependenciesType = {
    repository: RepositoryPort
};

export type dataType = {
    account: Entity, 
    amount: number
}


export class TransactionCase implements TransactionCasePort{

    async exec(data: dataType, dependencies: dependenciesType): Promise<DebitedSuccessful>{
        
        const { repository } = dependencies;
        const { account, amount } = data;

        try{
            return await repository.transaction(account, TransactionTypes.DEBIT, amount);
        }catch(error){
            // handle and log the error
            throw error;
        }
    }

}