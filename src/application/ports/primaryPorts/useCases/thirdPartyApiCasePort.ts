import { dependenciesType } from "@useCases/thirdParyApiCase";
import { ThridPartyPortResponseType } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";
import { DebitedSuccessful } from "@domain/models/debitedSucess";

export interface ThirdPartyApiCasePort{
    exec(data: DebitedSuccessful, dependencies: dependenciesType): Promise<ThridPartyPortResponseType>;
}