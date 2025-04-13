import { RepositoryPortCreate } from "@domain/ports/repository/repositoryPortCreate";
import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { Entity } from "@domain/entities/entity";
import { EntityProps } from "@domain/entities/entity";
export class EntityMysqlRepositoryCreate implements RepositoryPortCreate{


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
}