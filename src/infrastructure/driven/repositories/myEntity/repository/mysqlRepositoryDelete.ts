import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { Account } from "@domain/entities/account";
import { RepositoryPortDelete } from "@domain/repository/repositoryPortDelete";
export class EntityMysqlRepositoryDelete implements RepositoryPortDelete{


    /*
    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
    }
    */
    async delete(entity: Account): Promise<boolean>{
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
}