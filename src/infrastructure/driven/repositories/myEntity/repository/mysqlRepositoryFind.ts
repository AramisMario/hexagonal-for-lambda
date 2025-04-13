import { EntityNotFoundError } from "@domainErrors/entityErrors/entityNotFound";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { Entity } from "@domain/entities/entity";

import { RepositoryPortFind } from "@domain/ports/repository/repositoryPortFind";
export class EntityMysqlRepositoryFind implements RepositoryPortFind{


    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
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
}