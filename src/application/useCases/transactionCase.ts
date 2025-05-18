import { TransactionCasePort } from "@primaryPorts/useCases/transactionCasePort";
import { Account } from "@domain/models/account";
import { TransactionTypes } from "@domain/types/transactions";
import { AccountRepository } from "@domain/repository/accountRepository";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export type dependenciesType = {
    repository: AccountRepository
};

export type dataType = {
    account: Account, 
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