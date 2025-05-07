import { UnexpectedError } from "@domainErrors/generalErrors/unexpectedError";
import { MyEntityMapper } from "@drivenMappers/myEntityMapper/myEntityMapper";
import { Account } from "@domain/entities/account";
import { repositoryPortUpdate } from "@domain/repository/repositoryPortUpdate";
export class EntityMysqlRepositoryUpdate implements repositoryPortUpdate{


    private mapper: MyEntityMapper;
    constructor(mapper:MyEntityMapper){
        this.mapper = mapper;
    }

    async update(entity:Account): Promise<Account>{
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

}