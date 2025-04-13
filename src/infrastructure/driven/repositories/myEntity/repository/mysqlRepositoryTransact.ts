
import { TransactionValidationFail } from "@domainErrors/entityErrors/transactionValidationFail";
import { DATABASE_ERROR_CODES } from "@infrastructure/driven/repositories/myEntity/repository/errors/repositoryErrors";
import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { Entity } from "@domain/entities/entity";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { RepositoryPortTransaction } from "@domain/repository/repositoryPortTransact";
export class EntityMysqlRepositoryTransaction implements RepositoryPortTransaction{


    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
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