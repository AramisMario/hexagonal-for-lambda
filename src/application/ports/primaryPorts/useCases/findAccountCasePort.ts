import { Account } from "@domain/models/account";
import { dependenciesType } from "@useCases/findAccountCase";
export interface FindAccountCasePort{
    exec(account: string, dependencies: dependenciesType): Promise<Account>
}