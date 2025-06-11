import { DebitAccount } from "@models/debitAccount";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { dependenciesType } from "@application/useCases/accountDebitCase";

export interface AccountDebitPort{
    exec(data: DebitAccount, dependencies: dependenciesType): Promise<DebitedSuccessful>
}