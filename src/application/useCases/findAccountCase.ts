import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";
import { RepositoryPortFind } from "@domain/repository/repositoryPortFind";
import { Entity } from "@domain/entities/entity";
export type dependenciesType = {
    repositoryFind: RepositoryPortFind
};


export class FindAccountCase implements FindAccountCasePort{

    async exec(account: string, dependencies: dependenciesType): Promise<Entity>{

        const { repositoryFind } = dependencies;

        try{
            const entity = await repositoryFind.findByID(account);
            return entity;
        }catch(error){
            // handle and log the error
            throw error;
        }

        
    }

}