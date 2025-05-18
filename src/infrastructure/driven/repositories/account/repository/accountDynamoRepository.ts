import { DynamoDB } from "aws-sdk";
import { Account } from "@domain/models/account";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { AccountRepository } from "@domain/repository/accountRepository";
import { DocumentClient,TransactWriteItemsInput } from "aws-sdk/clients/dynamodb";
import { UnexpectedError } from "@domain/domainErrors/generalErrors/unexpectedError";
import { EntityNotFoundError } from "@domain/domainErrors/entityErrors/entityNotFound";
import { TransactionValidationFail } from "@domain/domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/repositories/account/repository/errors/repositoryErrors";

export class AccountDynamoRepository implements AccountRepository{

    private dynamo: DocumentClient;

    constructor(){
        this.dynamo = new DynamoDB.DocumentClient();
    }

    async create(entity:Account): Promise<Account>{
    
        try{

            const params = {
                TableName: "",
                Item: {

                }
              };
  
            await this.dynamo.put(params).promise();
            
            return entity;

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

            const params:{
                TableName:string,
                Key:{
                    id: string
                }
            } = {
                TableName: "",
                Key:{
                    id: id.toString()
                }
            }

            const result = await this.dynamo.get(params).promise();

            return {
                status: result.Item?.status,
                avaliableBalance: result.Item?.avaliableBalance,
                accountNumber: result.Item?.accountNumber
            }

        }catch(error){
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async transaction(entity: Account, transactionType: string, amount: number): Promise<DebitedSuccessful> {
    
        try{
            const params = {

            } as TransactWriteItemsInput;

            await this.dynamo.transactWrite(params);

            return {
                debitedAmount: amount,
                cost: 0
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
            const params = {

                TableName: "",
                Key:{
                    id: entity.id?.toString()
                },
                UpdateExpression: "",
                ExpressionAttributeNames: {},
                ExpressionAttributeValues: {},
                ReturnValues: 'ALL_NEW' 
            }

            const result = await this.dynamo.update(params).promise();
            return {
                id: entity.id,
                status: result.Attributes?.status,
                avaliableBalance: result.Attributes?.avaliableBalance,
                accountNumber: result.Attributes?.accountNumber
            }
        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }
}