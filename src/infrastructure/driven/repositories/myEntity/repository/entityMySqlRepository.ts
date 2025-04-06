import { RepositoryPort } from "@secondaryPorts/repository/repositoryPort";
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/repositories/myEntity/repository/errors/repositoryErrors";
import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { Entity } from "@domain/entities/entity";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { EntityProps } from "@domain/entities/entity";
export class EntityMysqlRepository implements RepositoryPort{


    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
    }
    

    async create(entityProps:EntityProps): Promise<Entity>{

        try{

            // make your create and select query
    
            const createdRecordResponse = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }
    
            return this.mapper.mapToEntity(createdRecordResponse);
        }catch(error){
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }

    async update(entity:Entity): Promise<Entity>{
        try{
            // make your query
    
            const updatedRecord = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }
            return this.mapper.mapToEntity(updatedRecord);
        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new UnexpectedError();
        }
    }

    async findByID(id: number): Promise<Entity>{
        try{
            // make your query

            const record = {
                first: 12345678,
                second: 654245,
                state: "ACTIVE"
            }

            return this.mapper.mapToEntity(record);
        }catch(error){
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async delete(entity: Entity): Promise<boolean>{
        try{
            // make your query
            const deletedRecord = {

            }
            return true;

        }catch(error){
            // handle database errors
            // you could use a logging method here to regist the error code
            throw new EntityNotFoundError();
        }
    }

    async transaction(entity: Entity, transactionType: string, amount: number): Promise<DebitedSuccessful> {

        try{

            // auto invoekd function to mock a transaction
            // you could use a logging method here to regist the error code
            const transactionResult =  await ((account) => {
                console.log(`Doing transaction ${transactionType} amount: ${amount} account: ${account}`);
                return {
                    result:{
                        debited: 1500,
                        cost: 0,
                    }
                }
            })(entity.getAccountNumber());
    
            return this.mapper.mapToModel(transactionResult.result);
        }catch(error){

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