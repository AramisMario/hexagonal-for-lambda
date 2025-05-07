import { Account } from "@domain/entities/account"
export interface RepositoryPortDelete{
    delete(data: Account): Promise<boolean>
}

