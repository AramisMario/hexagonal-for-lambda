import { Account } from "@domain/models/account";
import { AccountRepository } from "@domain/repository/accountRepository";
import { FindAccountCasePort } from "@primaryPorts/useCases/findAccountCasePort";

export type dependenciesType = {
    repository: AccountRepository
};


export class FindAccountCase implements FindAccountCasePort{

    async exec(account: string, dependencies: dependenciesType): Promise<Account>{

        const { repository } = dependencies;

        try{
            const entity = await repository.findByID(account);
            return entity;
        }catch(error){
            // handle and log the error
            throw error;
        }

    }

}