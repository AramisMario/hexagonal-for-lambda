import { Account } from "@domain/models/account";
import { TRANSACTION_TYPES } from "@utils/constants";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { AccountRepository } from "@domain/repository/accountRepository";
import { TransactionCasePort } from "@application/ports/primaryPorts/useCases/transactionCasePort";

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
            return await repository.transaction(account, TRANSACTION_TYPES.DEBIT, amount);
        }catch(error){
            // handle and log the error
            throw error;
        }
    }

}