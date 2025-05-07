import { Account } from "@domain/entities/account";
export interface RepositoryPortFind<T = unknown>{
    findByID(id: T): Promise<Account>
}
