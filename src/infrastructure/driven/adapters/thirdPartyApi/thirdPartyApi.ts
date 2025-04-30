import { ThirdPartyApiPort } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";
import { ThirdPartyApiErrorMapper } from "./thirdPartyErrorMapper/thirdPartyErrorMapper";
import { DebitedSuccessful } from "@domain/models/debitedSucess";
import { ThridPartyPortResponseType } from "@secondaryPorts/thirdPartyApi/thirdPartyApiPort";
export class ThridPartyApiAdapter implements ThirdPartyApiPort{

    private url: string;
    private errorMapper: ThirdPartyApiErrorMapper
    constructor(url: string, errorMapper: ThirdPartyApiErrorMapper){
        this.url = url;
        this.errorMapper = errorMapper;
    }

    public async callThirdPartyAPI(data: DebitedSuccessful): Promise<ThridPartyPortResponseType>{
        try{
            const result = await (async function makeHttpCall(url:string, config:object){

                // response mocked
                return {
                    data:{
                        code: "SUCCESSFUL",
                        message: "Exitoso",
                        data: {
                            confirmation: true
                        }
                    }
                }
            })(this.url,{
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            return { confirmation: result.data.data.confirmation };

        }catch(error){
            //lag the error here
            this.errorMapper.setCode(error.code);
            throw this.errorMapper.map();
        }

    }
}