import { Account } from "@domain/models/account";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { AccountRepository } from "@domain/repository/accountRepository";
import { UnexpectedError } from "@domain/domainErrors/generalErrors/unexpectedError";
import { EntityNotFoundError } from "@domain/domainErrors/entityErrors/entityNotFound";
import { TransactionValidationFail } from "@domain/domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/database/mysql/errors/repositoryErrors";
import { MySQLConnectionInterface } from "@infrastructure/driven/database/mysql/mysqlConnectionInterface";

export class AccountMysqlRepository implements AccountRepository{
    
    private mysqlConnection: MySQLConnectionInterface;
    constructor(mysqlConnection: MySQLConnectionInterface){
        this.mysqlConnection = mysqlConnection;
    }

    async create(account:Account): Promise<Account>{
    
        try{
    
            // make your create and select query
            const response = await this.mysqlConnection.execute("YOUR QUERY");

            return {
                status: response.rows[0].status,
                avaliableBalance: response.rows[0].avaliableBalance,
                accountNumber: response.rows[0].accountNumber
            }

        }catch(error){
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }


    async delete(entity: Account): Promise<boolean>{
        try{
            // make your query

            const response = await this.mysqlConnection.execute("YOUR DELETE QUERY");

            if(response.affectedRows > 0){
                return true;
            }

            return false;

        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }


    async findByID(id: number): Promise<Account>{
        try{
            // make your query
            const response = await this.mysqlConnection.execute("YOUR DELETE QUERY");

            return {
                status: response.rows[0].status,
                avaliableBalance: response.rows[0].avaliableBalance,
                accountNumber: response.rows[0].accountNumber
            }

        }catch(error){
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async transaction(entity: Account, transactionType: string, amount: number): Promise<DebitedSuccessful> {

        try{

            const response = await this.mysqlConnection.execute("CALL TRANSACTION(?,?,?)",[transactionType, entity.accountNumber, amount])

            return {
                debitedAmount: response[0].debitedAmount,
                cost: response[0].cost,
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

            await this.mysqlConnection.execute("UPDATE QUERY",[entity.id]);

            const updatedRecord = await this.mysqlConnection.execute("QUERY",[entity.id]);

            return {
                status: updatedRecord.rows[0].status,
                avaliableBalance: updatedRecord.rows[0].avaliableBalance,
                accountNumber: updatedRecord.rows[0].accountNumber
            }

        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }
}