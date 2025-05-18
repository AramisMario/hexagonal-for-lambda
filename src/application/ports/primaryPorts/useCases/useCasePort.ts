import { DebitAccount } from "@models/debitAccount";
import { dependenciesType } from "@application/useCases/accountDebitCase";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export interface UseCasePort{
    exec(data: DebitAccount, dependencies: dependenciesType): Promise<DebitedSuccessful>
}