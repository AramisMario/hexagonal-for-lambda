import { Account } from "@domain/models/account";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { AccountRepository } from "@domain/repository/accountRepository";
import { UnexpectedError } from "@domain/domainErrors/generalErrors/unexpectedError";
import { EntityNotFoundError } from "@domain/domainErrors/entityErrors/entityNotFound";
import { TransactionValidationFail } from "@domain/domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/repositories/account/repository/errors/repositoryErrors";

export class AccountMysqlRepository implements AccountRepository{
    
    constructor(){

    }

    async create(entity:Account): Promise<Account>{
    
        try{
    
            // make your create and select query
    
            const record = {
                data:{
                    status: 'ACTIVE',
                    avaliableBalance: 654245,
                    accountNumber: '123456789'
                }

            }
    
            return {
                status: record.data.status,
                avaliableBalance: record.data.avaliableBalance,
                accountNumber: record.data.accountNumber
            }

        }catch(error){
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }


    async delete(entity: Account): Promise<boolean>{
        try{
            // make your query
            const deletedRecord = {
                deleted: true
            }
            return deletedRecord.deleted;

        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }


    async findByID(id: number): Promise<Account>{
        try{
            // make your query

            const record = {
                data:{
                    status: 'ACTIVE',
                    avaliableBalance: 654245,
                    accountNumber: '123456789'
                }

            }

            return {
                status: record.data.status,
                avaliableBalance: record.data.avaliableBalance,
                accountNumber: record.data.accountNumber
            }

        }catch(error){
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async transaction(entity: Account, transactionType: string, amount: number): Promise<DebitedSuccessful> {
    
        try{

            // auto invoekd function to mock a transaction
            // you could use a logging method here to regist the error code
            const transactionResult:{ result: { debitedAmount: number, cost: number } } = await ((account) => {
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

    async update(entity:Account): Promise<Account>{
        try{
            // make your query

            const record = {
                data:{
                    status: 'ACTIVE',
                    avaliableBalance: 654245,
                    accountNumber: '123456789'
                }

            }

            return {
                status: record.data.status,
                avaliableBalance: record.data.avaliableBalance,
                accountNumber: record.data.accountNumber
            }

        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }
}