import { DebitedSuccessful } from "@domain/models/debitedSucess";

export type ThridPartyPortResponseType = {
    confirmation: boolean
}

export interface ThirdPartyApiPort{
    callThirdPartyAPI(data: DebitedSuccessful): Promise<ThridPartyPortResponseType>;
}