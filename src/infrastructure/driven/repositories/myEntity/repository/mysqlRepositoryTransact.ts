
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/repositories/myEntity/repository/errors/repositoryErrors";
import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { Account } from "@domain/entities/account";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { RepositoryPortTransaction } from "@domain/repository/repositoryPortTransact";

export type TransactionResultType = {
    debitedAmount: number,
    cost: number,
}

export class EntityMysqlRepositoryTransaction implements RepositoryPortTransaction{

    async transaction(entity: Account, transactionType: string, amount: number): Promise<DebitedSuccessful> {

        try{

            // auto invoekd function to mock a transaction
            // you could use a logging method here to regist the error code
            const transactionResult:{ result: TransactionResultType } =  await ((account) => {
                console.log(`Doing transaction ${transactionType} amount: ${amount} account: ${account}`);
                return {
                    result:{
                        debitedAmount: 1500,
                        cost: 0,
                    }
                }
            })(entity.accountNumber);

            return {
                debitedAmount: transactionResult.result.debitedAmount,
                cost: transactionResult.result.cost,
            }
        }catch(error:any){

            // you could use a logging method here to regist the error code

            switch(error.code){
                case DATABASE_ERROR_CODES.TRANSACTION_VALIDATION_ERROR:
                    throw new TransactionValidationFail();
                default:
                    throw new EntityNotFoundError();
            }

        }
    }
}