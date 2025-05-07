import { Account } from "@domain/entities/account";

export interface FindAccountCasePort{
    exec(account: string, dependencies): Promise<Account>
}