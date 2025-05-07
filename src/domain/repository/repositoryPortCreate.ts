import { Account } from "@domain/entities/account"
import { EntityProps } from "@domain/entities/account";
export interface RepositoryPortCreate{
    create(entityProps:EntityProps): Promise<Account>

}