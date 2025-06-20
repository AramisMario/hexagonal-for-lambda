import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { ThirdPartyApiCasePort } from "@application/ports/primaryPorts/useCases/thirdPartyApiCasePort";
import { ThirdPartyApiPort, ThridPartyPortResponseType } from "@application/ports/secondaryPorts/thirdPartyApi/thirdPartyApiPort";

export type dependenciesType = {
    thirdPartyApi: ThirdPartyApiPort,
};
export class ThirdPartyApiCase implements ThirdPartyApiCasePort{
    async exec(data: DebitedSuccessful, dependencies: dependenciesType): Promise<ThridPartyPortResponseType> {
        const { thirdPartyApi } = dependencies;
        try{
            
            const response = await thirdPartyApi.callThirdPartyAPI(data);
            return response
        }catch(error){
            // handle and log the error
            throw error;
        }
    }
}