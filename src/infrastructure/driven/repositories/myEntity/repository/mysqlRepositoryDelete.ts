import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { Entity } from "@domain/entities/entity";
import { RepositoryPortDelete } from "@domain/repository/repositoryPortDelete";
export class EntityMysqlRepositoryDelete implements RepositoryPortDelete{


    /*
    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
    }
    */
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
}