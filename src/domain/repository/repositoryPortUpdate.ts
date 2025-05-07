import { Account } from "@domain/entities/account";
export interface repositoryPortUpdate{
    update(data:Account): Promise<Account>
}

