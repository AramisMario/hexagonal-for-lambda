import { dependenciesType } from "@useCases/useCase";
import { CaseData } from "@domain/models/caseData";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
export interface UseCasePort{
    exec(data: CaseData, dependencies: dependenciesType): Promise<DebitedSuccessful>
}