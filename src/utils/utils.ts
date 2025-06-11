import { DebitResponseDTOtype } from "@infrastructure/driving/DTOs/DebitResponseDTO";

export class Utils{
    static response(httpCode: number, code:string, message: string, data?:DebitResponseDTOtype){
        
        const response:{
            httpCode: number,
            code: string,
            message: string,
            body?: string
        } = {
            httpCode,
            code,
            message
        }

        if(data) response.body = JSON.stringify(data);

        return response;

    }
}