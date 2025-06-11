import { dependenciesType } from "@useCases/thirdParyApiCase";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { ThridPartyPortResponseType } from "@application/ports/secondaryPorts/thirdPartyApi/thirdPartyApiPort";

export interface ThirdPartyApiCasePort{
    exec(data: DebitedSuccessful, dependencies: dependenciesType): Promise<ThridPartyPortResponseType>;
}