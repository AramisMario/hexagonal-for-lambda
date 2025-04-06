import { dataType } from "@useCases/transactionCase";
import { dependenciesType } from "@useCases/transactionCase";
import { DebitedSuccessful } from "@domain/models/debitedSucess";

export interface TransactionCasePort{
    exec(data: dataType, dependencies: dependenciesType): Promise<DebitedSuccessful>
}