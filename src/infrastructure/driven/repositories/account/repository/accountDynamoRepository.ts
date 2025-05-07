import { Account } from "@domain/entities/account";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { AccountRepository } from "@domain/repository/accountRepository";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@drivenRepositories/account/repository/errors/repositoryErrors";

export class AccountDynamoRepository implements AccountRepository{


    async create(entity:Account): Promise<Account>{
    
        try{
    
            // make your create and select query
    

        }catch(error){
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }


    async delete(entity: Account): Promise<boolean>{
        try{
            // make your query


        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }


    async findByID(id: number): Promise<Account>{
        try{
            // make your query

        }catch(error){
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async transaction(entity: Account, transactionType: string, amount: number): Promise<DebitedSuccessful> {
    
        try{

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

        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }
}