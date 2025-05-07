import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";
import { RepositoryPortFind } from "@domain/repository/repositoryPortFind";
import { Account } from "@domain/entities/account";
export type dependenciesType = {
    repositoryFind: RepositoryPortFind
};


export class FindAccountCase implements FindAccountCasePort{

    async exec(account: string, dependencies: dependenciesType): Promise<Account>{

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